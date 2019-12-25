const path = require('path');
const fs = require('fs');
const { Parser } = require('jison');
const Root = require('./Root');
const Block = require('./Block');
const Assign = require('./Assign');
const CodeLine = require('./CodeLine');
const MathOp = require('./MathOp');
const buildRule = require('./buildRule');

const grammar = {
  lex: {
    rules: [
      ['\\s+', '/* skip whitespace */'],
      ['false|true', `return 'BOOL'`],
      ['(\\+|\\-|\\*|\\/)', `return 'OPT'`],
      ['\=', `return '='`],
      ['\\b([a-zA-Z_][^\\s]*)', `return 'IDENTIFIER'`],
      ['([0-9])+', `return 'NUM'`],
      ['$', `return 'EOF'`],
    ]
  },

  operators: [
    ['left', '+', '-'],
    ['left', '*', '/'],
  ],

  bnf: {
    // Add variable declarations on top
    Root: [
      buildRule('CodeLines EOF',
        function () {
          return new Root('$1');
        }
      ),
    ],

    //Root: [['CodeLines EOF', 'return (function(arg1, yy) {return `var ${yy.variables.join(", ")};\n\n${arg1}`})($1,
    // yy)']],

    CodeLines: [
      ['', '$$ = ""'],
      buildRule('CodeLine CodeLines',
        function () {
          return new CodeLine('$1', '$2');
        }
      ),
    ],

    CodeLine: [
      buildRule('Statement'),
      buildRule('Expression'),
    ],

    Expression: [
      buildRule('Assign'),
      buildRule('Math'),
    ],

    Assign: [
      buildRule('IDENTIFIER = Expression',
        function () {
          return new Assign('$1', '$2', '$3');
        }
      ),
    ],

    Math: [
      buildRule('NUM'),
      buildRule('Math OPT Math',
        function () {
          return new MathOp('$1', '$2', '$3');
        }
      ),
    ],
  }
};

const parser = new Parser(grammar);

parser.yy = {
  Root,
  Block,
  Assign,
  CodeLine,
  MathOp,
  variables: new Set()
};

const code = fs.readFileSync(path.join(__dirname, './calculator.test.vanilla')).toString();

const parsed = parser.parse(code);

console.log(parsed);