const Base = require('./Base');

module.exports = class MathOp extends Base {
  constructor(yy, arg1, arg2, arg3) {
    super(yy, arg1, arg2, arg3);
  }

  stringify() {
    // TODO: Always use 3 args.
    return `${this.arg1} ${this.arg2}${this.arg3 ? ' ' + this.arg3 : ''}`;
  }
};