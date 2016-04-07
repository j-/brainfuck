# brainfuck

```js
import brainfuck from 'brainfuck';

const source = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const helloworld = brainfuck(source);
const buffer = helloworld();

console.log(String.fromCharCode(...buffer)); // => "Hello world"
```
