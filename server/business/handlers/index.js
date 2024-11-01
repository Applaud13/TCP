import { HANDLER_IDS } from "../../config/constants/handlerIds.js";

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: 1,
    protoType: `initial.InitialPacket`,
  },
  [HANDLER_IDS.CREATE_GAME]: {
    handler: 2,
    protoType: `game.CreateGamePayload`,
  },
  [HANDLER_IDS.JOIN_GAME]: {
    handler: 3,
    protoType: `game.JoinGamePayload`,
  },
  [HANDLER_IDS.UPDATE_LOCATION]: {
    handler: 4,
    protoType: "game.LocationUpdatePayload",
  },
};

export const getProtoTypeByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new Error(`프로토타입을 찾을 수 없습니다. (handelrId: ${handlerId})`);
  }
  return handlers[handlerId].protoType;
};
