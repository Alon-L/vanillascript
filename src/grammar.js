const path = require('path');
const fs = require('fs');
const { Parser } = require('jison');
const Block = require('./Block');
const buildOp = require('./buildOp');

const rule = (exp, ) => {

};

const grammar = {
  lex: {
    rules: [
      ['\\s+', '/* skip whitespace */'],
      ['([a-zA-Z])+', `return 'STRING'`],
      ['([0-9])+', `return 'NUM'`],
      ['false|true', `return 'BOOL'`],
      ['(\\+|\\-|\\*|\\/)', `return 'OPT'`],
      ['$', `return 'EOF'`],
    ]
  },

  bnf: {
    Root: [['Statements EOF', 'return $1']],

    Statements: [
      ['', ''],
      ['Statement Statements', '$$ = $1'],
    ],

    Statement: [
      buildOp('Num Opt Num',
        function() {
          return new Block();
        }
      ),
      //['Num Opt Num', '$$ = $1 + \' + \' + $3'],
    ],

    Num: [
      ['NUM', '$$ = Number(yytext)']
    ],

    Opt: [
      ['OPT', '$$ = yytext.toString()']
    ]
  }
};

const parser = new Parser(grammar);

const code = fs.readFileSync(path.join(__dirname, './calculator.test.vanilla')).toString();

const parsed = parser.parse(code);

console.log(parsed);