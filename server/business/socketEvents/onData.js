import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../../config/constants/header.js";
import { packetParser } from "../parser/packetParser.js";

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  while (socket.buffer.length >= TOTAL_LENGTH) {
    const totalPacketLength = socket.buffer.readUInt32BE(0);

    if (socket.buffer.length >= totalPacketLength) {
      const type = socket.buffer.readUInt8(TOTAL_LENGTH);
      const packet = socket.buffer.slice(TOTAL_LENGTH + PACKET_TYPE_LENGTH);
      socket.buffer = socket.buffer.slice(totalPacketLength);
      console.log(`남은 버퍼: ${socket.buffer}`);

      try {
        switch (type) {
          case PACKET_TYPE.PING:
            break;
          case PACKET_TYPE.NORMAL:
            const { handlerId, sequence, payload } = packetParser(packet);

            break;
          case PACKET_TYPE.GAME_START:
            break;
          case PACKET_TYPE.LOCATION:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
