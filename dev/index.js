const [, , file, ...args] = process.argv;
global.args = args;
require(`./${file}.js`);
