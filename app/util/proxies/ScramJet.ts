import type {
  ScramjetInitConfig,
  ScramjetController
} from "@mercuryworkshop/scramjet";
import { Proxy } from "./Proxy";

const CONFIG: Partial<ScramjetInitConfig> = {
  prefix: "/app/~/scramjet/",
  files: {
    wasm: "/scram/scramjet.wasm.wasm",
    all: "/scram/scramjet.all.js",
    sync: "/scram/scramjet.sync.js"
  },
  flags: {
    rewriterLogs: false,
    scramitize: false,
    cleanErrors: true,
    sourcemaps: true
  }
};

export class ScramJet extends Proxy {
  scramjet?: ScramjetController;

  constructor() {
    super();

    this.setPrefix(CONFIG.prefix!);
    this.addPreq("/scram/scramjet.all.js");
  }

  async initialize(): Promise<void> {
    const { ScramjetController } = $scramjetLoadController();
    const scramjet = new ScramjetController(CONFIG);

    await scramjet.init();

    this.scramjet = scramjet;
  }

  encode(input: string): string {
    if (!this.scramjet) {
      throw new Error("Proxy not initialized yet");
    }
    return this.scramjet.encodeUrl(input);
  }

  decode(input: string): string {
    if (!this.scramjet) {
      throw new Error("Proxy not initialized yet");
    }
    return this.scramjet.decodeUrl(input);
  }
}
