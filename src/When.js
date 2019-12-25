const Base = require('./Base');

module.exports = class When extends Base {
  constructor(yy, arg1, arg2, arg3) {
    super(yy, arg1, arg2, arg3);
  }

  stringify() {
    return `if (${this.arg2}) ${this.arg3}`;
  }
};