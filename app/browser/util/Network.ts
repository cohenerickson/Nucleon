import { BareClient } from "@mercuryworkshop/bare-mux";

const client = new BareClient();

export const fetch = client.fetch.bind(client);
export const WebSocket = client.createWebSocket.bind(client);
