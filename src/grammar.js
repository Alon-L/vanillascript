const path = require('path');
const fs = require('fs');
const { Parser } = require('jison');
const Root = require('./Root');
const Block = require('./Block');
const Assign = require('./Assign');
const CodeLine = require('./CodeLine');
const buildOp = require('./buildOp');

const grammar = {
  lex: {
    rules: [
      ['\\s+', '/* skip whitespace */'],
      ['false|true', `return 'BOOL'`],
      ['(\\+|\\-|\\*|\\/)', `return 'OPT'`],
      ['\=', `return 'ASSIGN'`],
      ['\\b([a-zA-Z_][^\\s]*)', `return 'IDENTIFIER'`],
      ['([0-9])+', `return 'NUM'`],
      ['$', `return 'EOF'`],
    ]
  },

  bnf: {
    // Add variable declarations on top
    Root: [
      buildOp('CodeLines EOF',
        function() {
          return new Root('$1');
        }
      ),
    ],

    //Root: [['CodeLines EOF', 'return (function(arg1, yy) {return `var ${yy.variables.join(", ")};\n\n${arg1}`})($1, yy)']],

    CodeLines: [
      ['', '$$ = ""'],
      buildOp('CodeLine CodeLines',
        function() {
          return new CodeLine('$1', '$2');
        }
      ),
    ],

    CodeLine: [
      ['Statement', '$$ = $1'],
      ['Statements', '$$ = $1'],
    ],

    Statements: [
      buildOp('IDENTIFIER ASSIGN Statement',
        function() {
          return new Assign('$1', '$2', '$3');
        }
      ),
    ],

    Statement: [
      buildOp('NUM OPT NUM',
        function() {
          return new Block('$1', '$2', '$3');
        }
      ),
    ]
  }
};

const parser = new Parser(grammar);

parser.yy = {
  Root,
  Block,
  Assign,
  CodeLine,
  variables: new Set()
};

const code = fs.readFileSync(path.join(__dirname, './calculator.test.vanilla')).toString();

const parsed = parser.parse(code);

console.log(parsed);