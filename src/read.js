const path = require('path');
const fs = require('fs');

module.exports = () => {
  return fs.readFileSync(path.join(__dirname, './test.vanilla')).toString();
};
