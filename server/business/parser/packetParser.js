import { CLIENT_VERSION } from "../../config/constants/env.js";
import { getProtoMessages } from "../../init/loadFiles/loadProtos.js";
import { getProtoTypeByHandlerId } from "../handlers/index.js";

export const packetParser = (bufferedPacket) => {
  // 패킷을 proto를 사용해 디코딩
  const protoMessages = getProtoMessages();
  const protoPacket = protoMessages.common.Packet;

  let packet;
  try {
    packet = protoPacket.decode(bufferedPacket);
  } catch (error) {
    throw new Error(`패킷 디코딩 중 에러가 발생하였습니다.`);
  }
  const handlerId = packet.handlerId;
  const clientVersion = packet.clientVersion;
  const sequence = packet.sequence;

  // 클라이언트 버전 검사
  if (clientVersion !== CLIENT_VERSION) {
    throw new Error(`클라이언트 버전이 일치하지 않습니다.`);
  }

  // payload를 proto를 사용해 디코딩
  const protoType = getProtoTypeByHandlerId(handlerId);
  const [namespace, typeName] = protoType.split(".");
  const PayloadType = protoMessages[namespace][typeName];
  let payload;
  try {
    payload = PayloadType.decode(packet.payload);
  } catch (error) {
    throw new Error(`payload 디코딩 중 에러가 발생하였습니다~`);
  }

  // 패킷 구조 검사
  const errorMessage = PayloadType.verify(payload);
  if (errorMessage) {
    throw new Error(`패킷구조가 일치하지 않습니다. ${errorMessage}`);
  }

  // payload의 필수 필드 검사
  const expectedFields = Object.keys(PayloadType.fields);
  const receivedFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !receivedFields.includes(field));
  if (missingFields.length > 0) {
    throw new Error(`필수 필드가 누락되었습니다. ${missingFields.join(",")}`);
  }

  return { handlerId, sequence, payload };
};
