import { motion } from "motion/react";
import { Sky } from "~/components/Sky";
import { manifest } from "~/config/manifest";

export default function Home() {
  return (
    <Sky>
      <motion.section
        className="flex h-screen w-screen flex-col justify-center gap-8 p-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="flex flex-1 gap-5 opacity-90">
          <a
            target="_blank"
            href="https://discord.gg/unblock"
            className="h-min transition-all hover:scale-105"
          >
            Discord
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min transition-all hover:scale-105"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min transition-all hover:scale-105"
          >
            Documentation
          </a>
        </div>
        <h1 className="scale-y-110 transform text-6xl font-light opacity-90">
          Welcome to {manifest.name}.
        </h1>
        <h2 className="text-xl font-light">{manifest.description}</h2>
        <div className="flex gap-4">
          <a
            className="glass flex w-max items-center justify-center gap-2 rounded-md bg-black/90 px-4 py-2 text-white shadow-sm transition-all hover:scale-105 hover:cursor-pointer hover:shadow-xl"
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
