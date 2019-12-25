const Base = require('./Base');

module.exports = class Do extends Base {
  constructor(yy, arg1, arg2) {
    super(yy, arg1, arg2);
  }

  stringify() {
    return `${this.arg2}`;
  }
};