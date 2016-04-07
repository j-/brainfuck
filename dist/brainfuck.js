/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var generateFunction = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	/*!
	The MIT License (MIT)

	Copyright (c) 2014 Mathias Buus

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	https://github.com/mafintosh/generate-function
	*/

	var INDENT_START = /[\{\[]/
	var INDENT_END = /[\}\]]/

	module.exports = function() {
	  var lines = []
	  var indent = 0

	  var push = function(str) {
	    var spaces = ''
	    while (spaces.length < indent*2) spaces += '  '
	    lines.push(spaces+str)
	  }

	  var line = function(str) {
	    if (!str) return line

	    if (INDENT_END.test(str) && INDENT_START.test(str)) {
	      indent--
	      push(str)
	      indent++
	      return line
	    }
	    if (INDENT_START.test(str)) {
	      push(str)
	      indent++
	      return line
	    }
	    if (INDENT_END.test(str)) {
	      indent--
	      push(str)
	      return line
	    }

	    push(str)
	    return line
	  }

	  line.toString = function() {
	    return lines.join('\n')
	  }

	  line.toFunction = function(scope) {
	    var src = 'return ('+line.toString()+')'

	    var keys = Object.keys(scope || {}).map(function(key) {
	      return key
	    })

	    var vals = keys.map(function(key) {
	      return scope[key]
	    })

	    return Function.apply(null, keys.concat(src)).apply(null, vals)
	  }

	  if (arguments.length) line.apply(null, arguments)

	  return line
	}


/***/ }
/******/ ]);