const Block = require('./Block');

module.exports = class Assign extends Block {
  constructor(yy, arg1, arg2, arg3) {
    super(yy, arg1, arg2, arg3);

    this.declareVariables();
  }

  declareVariables() {
    this.yy.variables.add(this.arg1);
  }
};