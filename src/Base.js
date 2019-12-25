module.exports = class Base {
  constructor(yy, arg1, arg2, arg3) {
    this.yy = yy;
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
  }

  stringify() {
    return `${this.arg1} ${this.arg2} ${this.arg3}`;
  }

  buildIndent() {
    let indent = '';
    for (let i = 0; i < this.yy.indent; i++) {
        indent += '  ';
    }
    return indent;
  }
};