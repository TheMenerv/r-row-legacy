import { io, Socket } from "socket.io-client";

let socket: Socket = null;
let clients: any = {};
let serverURL: string = null;

export const setServerURL = (url: string) => {
  serverURL = url;
};

export const getSocket = () => {
  if (serverURL === null) throw new Error("No server URL provided");
  if (socket === null) {
    socket = io(serverURL);
    socket.on("clients", (c) => {
      clients = c;
    });
  }
  return socket;
};

export const getClients = () => {
  return clients;
};

export const isServerConnected = () => {
  return socket.id !== undefined;
};
