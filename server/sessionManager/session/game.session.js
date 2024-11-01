import Game from "../classes/game.class.js";
import { gameSessions } from "./sessions.js";

export const addGameSession = (id) => {
  const newGame = new Game(id);
  gameSessions.push(newGame);
  return newGame;
};

export const removeGameSession = (id) => {
  const index = gameSessions.findIndex((game) => game.id === id);
  if (index !== -1) {
    return gameSessions.splice(index, 1)[0];
  }
};

export const getGameSession = (id) => {
  return gameSessions.find((game) => game.id === id);
};

export const getAllGameSessions = () => {
  return gameSessions;
};
