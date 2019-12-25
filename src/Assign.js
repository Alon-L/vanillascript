const Base = require('./Base');

module.exports = class Assign extends Base {
  constructor(yy, arg1, arg2, arg3) {
    super(yy, arg1, arg2, arg3);

    this.declareVariables();
  }

  declareVariables() {
    this.yy.variables.add(this.arg1);
  }
};