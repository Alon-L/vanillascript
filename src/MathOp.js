const Block = require('./Block');

module.exports = class MathOp extends Block {
  constructor(yy, arg1, arg2, arg3) {
    super(yy, arg1, arg2, arg3);
  }

  stringify() {
    return `${this.arg1} ${this.arg2}${this.arg3 ? ' ' + this.arg3 : ''}`;
  }
};