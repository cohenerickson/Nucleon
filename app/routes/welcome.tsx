import { Sky } from "~/components/Sky";
import { manifest } from "~/config/manifest";
import { motion } from "motion/react";

export default function Home() {
  return (
    <Sky>
      <motion.section
        className="flex justify-center h-screen w-screen flex-col gap-8 p-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="flex-1 gap-5 flex opacity-90">
          <a
            target="_blank"
            href="https://discord.gg/unblock"
            className="h-min hover:scale-105 transition-all"
          >
            Discord
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min hover:scale-105 transition-all"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min hover:scale-105 transition-all "
          >
            Documentation
          </a>
        </div>
        <h1 className="text-6xl font-light transform scale-y-110 opacity-90">
          Welcome to {manifest.name}.
        </h1>
        <h2 className="text-xl font-light">{manifest.description}</h2>
        <div className="flex gap-4">
          <a
            className="glass bg-black/90 transition-all px-4 py-2 rounded-md shadow-sm hover:scale-105 hover:shadow-xl hover:cursor-pointer text-white w-max flex items-center justify-center gap-2"
            href="/app"
          >
            <p>Get Started</p>
          </a>
        </div>
        <div className="flex-1"></div>
      </motion.section>
    </Sky>
  );
}
