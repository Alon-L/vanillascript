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
    const indentedArg2 = this.arg2
      .split('\n')
      .filter(i => i.length)
      .map(i => {
        return this.buildIndent() + i;
      })
      .join('\n');
    this.yy.indent--;
    return `${this.arg1}\n${indentedArg2}\n${this.arg3}`;
  }
};