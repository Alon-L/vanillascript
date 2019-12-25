const Base = require('./Base');

module.exports = class BlockEnd extends Base {
  constructor(yy, arg1) {
    super(yy, arg1);
  }

  stringify() {
    // TODO: Add variable definitions on top of scope.

    // BlockEnd gets called before Block
    this.yy.indent++;
    return `${this.arg1}`;
  }
};