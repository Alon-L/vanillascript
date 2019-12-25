const Block = require('./Block');

module.exports = class CodeLine extends Block {
  constructor(yy, arg1, arg2) {
    super(yy, arg1, arg2);
  }

  stringify() {
    return `${this.arg1};\n${this.arg2}`;
  }
};