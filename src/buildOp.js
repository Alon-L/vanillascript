const unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*);\s*\}/;

const buildOp = (tokens, action) => {
  // TODO: This part may need a bit of work
  // (${action}($1, $2, $3))
  // and
  // $$ = ${action}($1, $2, $3).stringify()

  const match = unwrap.exec(action);
  action = match ? match[1] : `(${action}($1, $2, $3))`;
  action = action.replace(/\bnew /g, '$&yy.');
  action = action.replace(/\b(?:Block\.wrap|extend)\b/g, 'yy.$&');

  const performAction =
    `$$ = ${action}($1, $2, $3).stringify()`;

  return [tokens, performAction];
};

module.exports = buildOp;