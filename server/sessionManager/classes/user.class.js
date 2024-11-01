class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();
    this.latency = 0;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }

  //     ping() {
  //       const now = Date.now();

  //       console.log(`${this.id}: ping`);
  //       this.socket.write(createPingPacket(now));
  //     }

  handlePong(data) {
    this.latency = (Date.now() - data.timestamp) / 2;
    console.log(`지연시간 ${this.latency}ms`);
  }

  calculatePosition(latency) {
    const timeDiff = latency / 1000;
    const speed = 1;
    const distance = speed * timeDiff;

    return {
      x: this.x + distance,
      y: this.y,
    };
  }
}

export default User;
