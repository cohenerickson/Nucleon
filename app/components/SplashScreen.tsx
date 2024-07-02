import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen({
  ready,
  status
}: {
  ready: boolean;
  status: string;
}) {
  const [scope, animate] = useAnimate();
  const [hidden, setHidden] = useState<boolean>(false);

  async function closeSplashScreen() {
    await animate(scope.current, {
      opacity: 0,
      transition: {
        duration: 1000
      }
    });

    setHidden(true);
  }

  useEffect(() => {
    if (ready) closeSplashScreen();
  }, [ready]);

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
      <p className="">{status}</p>
    </motion.section>
  );
}
