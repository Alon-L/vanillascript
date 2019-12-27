const Base = require('./Base');

module.exports = class StringOp extends Base {
  constructor(yy, arg1, arg2) {
    super(yy, arg1, arg2);
  }

  stringify() {
    return `${this.arg1} ${this.arg2}`;
  }
};