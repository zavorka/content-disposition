#!/usr/bin/env node
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const argv = require('yargs')
 .usage('Usage: [-h] [-t | -f | -p PARAM]')
 .demandCommand(0)
 .option('h', { alias: 'headers', description: 'Input is a list of HTTP headers', boolean: true})
 .option('t', { alias: 'type', conflicts: ['p', 'f'], boolean: true})
 .option('f', { alias: 'filename', conflicts: ['p', 't'], boolean: true})
 .option('p', { alias: 'param', conflicts: ['t', 'f'], describe: '', string: true })
 .argv;

const cd = require('..');
const out = (function() {
  if (argv.type) {
    return function(input) { return cd.parse(input).type; }
  } else if (argv.filename) {
    return function(input) { return cd.parse(input).parameters.filename; }
  } else if (argv.param) {
    return function(input) { return cd.parse(input).parameters[argv.param]; }
  } else {
    return function(input) { return cd.parse(input); }
  }
})();

const parse = (function() {
  if (argv.headers) {
     return function(i) { return !i.match(/^content-disposition: /) ? null : i.replace(/^content-disposition: /, ''); };
  } else {
     return function(i) { return i; };
  }
})();

function one(line) {
  const input = parse(line);
  if (input) { console.log(out(input)); }
}

if (argv._.length > 0) {
  argv._.forEach(one);
} else {
  readline.on('line', one);
}

