import { useTour } from "@reactour/tour";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Loader() {
  const [scope, animate] = useAnimate();
  const [hidden, setHidden] = useState<boolean>(false);
  const { setIsOpen } = useTour();

  async function runAnimation() {
    await sleep(1000);

    await animate(scope.current, {
      opacity: 0,
      transition: {
        duration: 1000
      }
    });

    setHidden(true);

    const hasVisited = localStorage.getItem("hasVisited") === "true";

    if (!hasVisited) {
      //localStorage.setItem("hasVisited", "true");
      setIsOpen(true);
    }
  }

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <motion.section
      id="loader"
      ref={scope}
      className={`absolute right-0 top-0 z-50 flex h-screen w-screen select-none flex-col items-center justify-center gap-2 bg-background ${
        hidden && "hidden"
      }`}
    >
      <img src="/logo.svg" className="w-32"></img>
      <h1 className="text-7xl font-black">Nucleon</h1>
      <p className="">The Unrestrictd Browsing Experience.</p>
    </motion.section>
  );
}
