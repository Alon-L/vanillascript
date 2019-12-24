module.exports = class Block {
  constructor(arg1, bridge, arg2) {
    this.arg1 = arg1;
    this.bridge = bridge;
    this.arg2 = arg2;
  }

  stringify() {
    return `${this.arg1} ${this.bridge} ${this.arg2}`;
  }
};