const Base = require('./Base');

module.exports = class Block extends Base {
  constructor(yy, arg1, arg2, arg3) {
    super(yy, arg1, arg2, arg3);
  }

  stringify() {
    /*
    {
      ...code...
    }
     */
    return `${this.arg1}\n${this.arg2}${this.arg3}`;
  }
};