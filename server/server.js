import net from "net";
import { connection } from "./business/socketEvents/connection.js";
import { loadFiles } from "./init/loadFiles/index.js";
import { HOST, PORT } from "./config/constants/env.js";

const server = net.createServer(connection);

await loadFiles();

server.listen(PORT, HOST, () => {
  console.log(`서버가 ${PORT}:${HOST}에서 실행 중입니다.`);
});
