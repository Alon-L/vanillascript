const unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*);\s*\}/;

const buildOp = (tokens, action) => {
  // Isolate function return value for better efficiency
  const match = unwrap.exec(action);
  action = match ? match[1] : `(${action}())`;

  // Use the class members stored under 'yy'.
  // All required classes are contained in the 'yy' object.
  action = action.replace(/\bnew /g, '$&yy.');
  action = action.replace(/\b(?:Block\.wrap|extend)\b/g, 'yy.$&');

  // Add the 'yy' as first parameter
  action = action.replace(/\((.*?)\)/g, '(yy, $1)');
  action = action.replace(/'/g, '');

  const actionStr = `${action}.stringify()`;

  // If last token, return the value
  const performAction = tokens.endsWith('EOF')
      ? `return ${actionStr}`
      : `$$ = ${actionStr}`;

  return [tokens, performAction];
};

module.exports = buildOp;