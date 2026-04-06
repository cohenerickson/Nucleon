import { motion } from "motion/react";

export function LoadingScreen() {
  return (
    <motion.div
      className="absolute top-0 left-0 bg-white flex items-center justify-center h-screen w-screen flex-col gap-4 p-20 text-center"
      exit={{ top: "-100%", opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <h2 className="text-4xl font-light">Nucleon</h2>
      <h2 className="text-xl font-light">
        Please hang tight while we set some things up in the background...
      </h2>
    </motion.div>
  );
}
