const path = require('path');
const fs = require('fs');
const { Parser } = require('jison');
const Root = require('./Root');
const Block = require('./Block');
const BlockEnd = require('./BlockEnd');
const Do = require('./Do');
const When = require('./When');
const ExpressionParentheses = require('./ExpressionParentheses');
const Assign = require('./Assign');
const CodeLine = require('./CodeLine');
const StringOp = require('./StringOp');
const TextOp = require('./TextOp');
const MathOp = require('./MathOp');
const buildRule = require('./buildRule');

const grammar = {
  lex: {
    rules: [
      ['\\s+', '/* skip whitespace */'],
      ['when', `return 'WHEN'`],
      ['do', `return 'DO'`],
      ['\\(', `return '('`],
      ['\\)', `return ')'`],
      ['\\{', `return '{'`],
      ['\\}', `return '}'`],
      ['false|true', `return 'BOOL'`],
      ['\\+', `return '+'`],
      ['\\-', `return '-'`],
      ['\\*', `return '*'`],
      ['\\/', `return '/'`],
      ['\\=', `return '='`],
      ['\'', `return 'SINGLEQUOTE'`],
      ['\"', `return 'DOUBLEQUOTE'`],
      ['[a-zA-Z_]+', `return 'IDENTIFIER'`],
      ['([0-9])+', `return 'NUM'`],
      ['[^\'"]+', `return 'TEXT'`],
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
      buildRule('Assign'),
      buildRule('When'),
    ],

    Expression: [
      buildRule('( Expression )',
        function() {
          return new ExpressionParentheses('$1', '$2', '$3');
        }
      ),
      buildRule('Math'),
    ],

    When: [
      buildRule('WHEN Expression Do',
        function() {
          return new When('$1', '$2', '$3');
        }
      ),
    ],

    Do: [
      buildRule('DO Block',
        function() {
          return new Do('$1', '$2');
        }
      ),
    ],

    Block: [
      buildRule('{ CodeLines Block',
        function() {
          return new Block('$1', '$2', '$3');
        }
      ),
      buildRule('}',
        function() {
          return new BlockEnd('$1')
        }
      ),
    ],

    Assign: [
      buildRule('IDENTIFIER = Expression',
        function () {
          return new Assign('$1', '$2', '$3');
        }
      ),
    ],

    Math: [
      buildRule('Resolvable'),
      buildRule('( Math )',
        function() {
          return new ExpressionParentheses('$1', '$2', '$3');
        }
      ),
      buildRule('Math + Math',
        function () {
          return new MathOp('$1', '$2', '$3');
        }
      ),
      buildRule('Math - Math',
        function () {
          return new MathOp('$1', '$2', '$3');
        }
      ),
      buildRule('Math * Math',
        function () {
          return new MathOp('$1', '$2', '$3');
        }
      ),
      buildRule('Math / Math',
        function () {
          return new MathOp('$1', '$2', '$3');
        }
      ),
    ],

    Resolvable: [
      buildRule('NUM'),
      buildRule('BOOL'),
      buildRule('IDENTIFIER'),
      buildRule('String'),
    ],

    String: [
      buildRule('Quote Text Quote',
        function() {
          return new StringOp('$1', '$2', '$3');
        }
      ),
    ],

    Quote: [
      buildRule('SINGLEQUOTE'),
      buildRule('DOUBLEQUOTE'),
    ],

    Text: [
      ['', '$$ = ""'],
      buildRule('Resolvable Text',
        function() {
          return new TextOp('$1', '$2');
        }
      ),
    ]
  }
};

const parser = new Parser(grammar);



parser.yy = {
  Root,
  Block,
  BlockEnd,
  Do,
  When,
  ExpressionParentheses,
  Assign,
  CodeLine,
  MathOp,
  StringOp,
  TextOp,
  variables: new Set(),
  indent: 0,
};

const code = fs.readFileSync(path.join(__dirname, './calculator.test.vanilla')).toString();

const parsed = parser.parse(code);

console.log(parsed);