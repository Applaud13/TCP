export const packetNames = {
  initial: {
    InitialPacket: "initial.InitialPacket",
  },

  common: {
    Packet: "common.Packet",
    Ping: "common.Ping",
  },

  game: {
    CreateGamePayload: "game.CreateGamePayload",
    JoinGamePayload: "game.JoinGamePayload",
    LocationUpdatePayload: "game.LocationUpdatePayload",
  },

  gameSignal: {
    LocationUpdate: "gameSignal.LocationUpdate",
    Start: "gameSignal.Start",
  },

  response: {
    Response: "response.Response",
  },
};
