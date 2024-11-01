import BaseManager from "./base.manager.js";

class IntervalManager extends BaseManager {
  constructor() {
    super();
    this.intervals = new map();
  }

  addPlayer(playerId, callback, interval, type = "user") {
    if (!this.intervals.has(playerId)) {
      this.intervals.set(playerId, new Map());
    }
    this.intervals.get(playerId).set(type, setInterval(callback, interval));
  }

  addupdatePosition(playerId, callback, interval) {
    this.addPlayer(playerId, callback, interval, "updatePosition");
  }

  reomovePlayer(playerId) {
    if (this.intervals.has(playerId)) {
      const userIntervals = this.intervals.get(playerId);
      userIntervals.foreach((intervalId) => clearInterval(intervalId));
      this.intervals.delete(playerId);
    }
  }

  reomveInterval(playerId, type) {
    if (this.intervals.has(playerId)) {
      const userIntervals = this.intervals.get(playerId);
      if (userIntervals.has(type)) {
        clearInterval(userIntervals.get(type));
        userIntervals.delete(type);
      }
    }
  }

  clearAll() {
    this.intervals.foreach((userIntervals) => {
      userIntervals.foreach((intervalId) => clearInterval(intervalId));
    });
    this.intervals.clear();
  }

  addGame(gameId, callback, interval) {
    this.addPlayer(gameId, callback, interval, "game");
  }
}

export default IntervalManager;
