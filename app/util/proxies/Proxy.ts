export abstract class Proxy {
  static preqs: Set<string> = new Set();
  prefix?: string;

  abstract initialize(): Promise<void>;
  abstract encode(input: string): string;
  abstract decode(input: string): string;

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  addPreq(preq: string) {
    Proxy.preqs.add(preq);
  }
}
