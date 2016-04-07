var generateFunction = require('./generate-function');

function getCommand (command) {
	switch (command) {
		case '>': return '++ptr';
		case '<': return '--ptr';
		case '+': return '++data[ptr]';
		case '-': return '--data[ptr]';
		case '.': return 'output.push(data[ptr])';
		case ',': return 'data[ptr] = input.shift()';
		case '[': return 'while (data[ptr]) {';
		case ']': return '}';
	}
}

module.exports = function brainfuck (source) {
	var fn = generateFunction()
		('function (input) {')
			('var data = Array(1024).fill(0)')
			('var output = []')
			('var ptr = 0');

	fn = Array.from(source)
		.map(getCommand)
		.reduce(function (fn, line) {
			return fn(line);
		}, fn);

	fn = fn('return output')
		('}');

	return fn.toFunction();
}
