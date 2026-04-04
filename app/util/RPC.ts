// Needs to get inferred types, had to rewrite for debugging purposes to simplify the initial complexity of RPC
// May need support for transferable objects in the future, but for now we won't need this functionality

export class RPC {
  #debug?: boolean;
  private broadcastChannel: BroadcastChannel;

  constructor(channelName: string, debug?: boolean) {
    this.broadcastChannel = new BroadcastChannel(channelName);
    this.#debug = debug;
  }

  debug(...args: any[]) {
    if (this.#debug) {
      console.log(`[RPC ${this.broadcastChannel.name}]`, ...args);
    }
  }

  expose(method: string, handler: (...args: any[]) => Promise<any> | any) {
    this.broadcastChannel.addEventListener("message", async ({ data }) => {
      if (data && data.method === method && data.id) {
        this.debug("Received RPC request:", method, data.params);

        try {
          const result = await handler(...data.params);

          this.broadcastChannel.postMessage({
            id: data.id,
            result
          });
        } catch (error) {
          this.debug("RPC handler error:", error);

          this.broadcastChannel.postMessage({
            id: data.id,
            error: error
          });
        }
      }
    });
  }

  call(method: string, ...params: any[]): Promise<any> {
    this.debug("RPC call:", method, params);

    return new Promise((resolve, reject) => {
      const requestId = crypto.randomUUID();

      const callback = ({ data }: MessageEvent) => {
        if (data && data.result && data.id === requestId) {
          this.debug("Received RPC response:", data.result);

          this.broadcastChannel.removeEventListener("message", callback);
          resolve(data.result);
        } else if (data && data.error && data.id === requestId) {
          this.debug("Received RPC error:", data.error);

          this.broadcastChannel.removeEventListener("message", callback);
          reject(data.error);
        } else {
          this.debug("Received unrelated message:", data);
        }
      };

      this.broadcastChannel.addEventListener("message", callback);

      this.broadcastChannel.postMessage({
        id: requestId,
        method,
        params
      });

      this.debug("Sent RPC call:", requestId);
    });
  }

  destroy() {
    this.broadcastChannel.close();
  }
}
