import { io, Socket } from "socket.io-client";

let socket: Socket = null;
let serverURL: string = null;

export const setServerURL = (url: string) => {
  serverURL = url;
};

export const getSocket = () => {
  if (serverURL === null) throw new Error("No server URL provided");
  if (socket === null) socket = io(serverURL);
  return socket;
};

export const isServerConnected = () => {
  return socket.id !== undefined;
};
