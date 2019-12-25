const Base = require('./Base');

module.exports = class Root extends Base {
  constructor(yy, arg1) {
    super(yy, arg1);

    this.variables = this.serializeVariableDefinitions();
  }

  // Formats variables names in Set to match the 'x, y, z' pattern.
  serializeVariableDefinitions() {
    const { variables } = this.yy;
    let varsStr = '';
    const connector = ', ';
    for (const variable of variables.values()) {
      varsStr += `${variable}${connector}`;
    }
    return varsStr.slice(0, -connector.length);
  }

  stringify() {
    return `var ${this.variables};\n\n${this.arg1}`;
  }
};