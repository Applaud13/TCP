import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

export const connection = (socket) => {
  console.log(`유저가 접속하였습니다: ${socket.remoteAddress}:${socket.remotePort}`);
  socket.buffer = Buffer.alloc(0);
  socket.on("data", onData(socket));
  // socket.on("end", onEnd(socket));
  // socket.on("error", onError(socket));
};
