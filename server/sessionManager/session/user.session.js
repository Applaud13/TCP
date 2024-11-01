import User from "../classes/user.class";
import { userSessions } from "./sessions";

export const addUser = (socket, id) => {
  const user = new User(socket, id);
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};

export const getNextSequence = (id) => {
  const user = userSessions.find((user) => user.id === id);
  if (user) {
    return user.getNextSequence();
  }
  return null;
};

export const getUserBySocket = (socket) => {
  return userSessions.find((user) => user.socket === socket);
};
