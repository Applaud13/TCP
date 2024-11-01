class BaseManager {
  constructor() {
    if (new.target === BaseManager) {
      throw new Error(`BaseManager를 직접 생성할 수 없습니다.`);
    }
  }

  addPlayer(playerId, ...args) {
    throw new Error(`addPlayer method를 구현해야 합니다.`);
  }

  reomovePlayer(playerId) {
    throw new Error(`removePlayer method를 구현해야 합니다.`);
  }

  clearAll() {
    throw new Error(`clearAll method를 구현해야 합니다.`);
  }
}

export default BaseManager;
