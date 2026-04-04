import EventEmitter from "events";

enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL
}

const LOG_LEVEL = LogLevel.DEBUG;

type LogEvents = {
  debug: any[];
  info: any[];
  warn: any[];
  error: any[];
  fatal: any[];
};

export class Logger extends EventEmitter<LogEvents> {
  private ctx: Console;
  private level: LogLevel;

  constructor(ctx: Console = console, level: LogLevel = LOG_LEVEL) {
    super();
    this.ctx = ctx;
    this.level = level;
  }

  debug(...args: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      this.ctx.debug("[DEBUG]", ...args);
      this.emit("debug", ...args);
    }
  }

  info(...args: any[]) {
    if (this.level <= LogLevel.INFO) {
      this.ctx.info("[INFO]", ...args);
      this.emit("info", ...args);
    }
  }

  warn(...args: any[]) {
    if (this.level <= LogLevel.WARN) {
      this.ctx.warn("[WARN]", ...args);
      this.emit("warn", ...args);
    }
  }

  error(...args: any[]) {
    if (this.level <= LogLevel.ERROR) {
      this.ctx.error("[ERROR]", ...args);
      this.emit("error", ...args);
    }
  }

  fatal(...args: any[]) {
    this.ctx.error("[FATAL]", ...args);
    this.emit("fatal", ...args);
    debugger;
    throw new Error(
      args
        .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
        .join(" ")
    );
  }
}

export const log = new Logger(self.console);
