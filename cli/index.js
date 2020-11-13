#!/usr/bin/env node
const argv = require('yargs')
 .usage('Usage: [-t | -f| -p PARAM]')
 .demandCommand(1)
 .option('t', { alias: 'type', conflicts: ['p', 'f'], boolean: true})
 .option('f', { alias: 'filename', conflicts: ['p', 't'], boolean: true})
 .option('p', { alias: 'param', conflicts: ['t', 'f'], describe: '', string: true })
 .argv;

const cd = require('..').parse(argv._[0])
if (argv.type) {
  console.log(cd.type);
} else if (argv.filename) {
  console.log(cd.parameters.filename);
} else if (argv.param) {
  console.log(cd.parameters[argv.param]);
} else {
  console.log(cd);
}
