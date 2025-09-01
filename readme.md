<h1 align="center">
  quetie
</h1>

<div align="center">
  <a href="https://npmjs.org/package/quetie">
    <img src="https://badgen.net/npm/v/quetie" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/quetie/actions">
    <img src="https://github.com/TomerAberbach/quetie/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://unpkg.com/quetie/dist/index.js">
    <img src="https://deno.bundlejs.com/?q=quetie&badge" alt="gzip size" />
  </a>
  <a href="https://unpkg.com/quetie/dist/index.js">
    <img src="https://deno.bundlejs.com/?q=quetie&config={%22compression%22:{%22type%22:%22brotli%22}}&badge" alt="brotli size" />
  </a>
  <a href="https://github.com/sponsors/TomerAberbach">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor" />
  </a>
</div>

<div align="center">
  Just the cutest and tiniest queue/deque implementation!
</div>

## Features

- **Tiny:** ~360 bytes minzipped!
- **Fast:**
  [amortized O(1) time complexity](https://en.wikipedia.org/wiki/Amortized_analysis)
  for all operations
- **Tree Shakeable:** use `Queue` if you don't need a full `Deque`!

## Install

```sh
$ npm i quetie
```

## Usage

```js
import { Deque, Queue } from 'quetie'

const queue = new Queue()

queue.push(1)
queue.push(2)
queue.push(3)

console.log(queue.size)
//=> 3

console.log(queue.at(0))
console.log(queue.at(1))
console.log(queue.at(2))
console.log(queue.at(3))
console.log(queue.at(-1))
//=> 1
//=> 2
//=> 3
//=> 1
//=> 3

console.log([...queue])
//=> [ 1, 2, 3 ]

console.log(queue.shift())
console.log(queue.shift())
console.log(queue.shift())
console.log(queue.shift())
//=> 1
//=> 2
//=> 3
//=> undefined

const deque = new Deque()

deque.push(1)
deque.push(2)
deque.push(3)
deque.unshift(0)

console.log(deque.size)
//=> 4

console.log(deque.at(0))
console.log(deque.at(1))
console.log(deque.at(2))
console.log(deque.at(3))
console.log(deque.at(-1))
//=> 0
//=> 1
//=> 2
//=> 3
//=> 3

console.log([...deque])
//=> [ 0, 1, 2, 3 ]

console.log(deque.pop())
console.log(deque.shift())
console.log(deque.shift())
console.log(deque.pop())
console.log(deque.pop())
//=> 3
//=> 0
//=> 1
//=> 2
//=> undefined
```

See the
[type definitions](https://github.com/TomerAberbach/quetie/blob/main/src/index.d.ts)
for more documentation.

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/quetie/issues/new).

## License

[MIT](https://github.com/TomerAberbach/quetie/blob/main/license) ©
[Tomer Aberbach](https://github.com/TomerAberbach) \
[Apache 2.0](https://github.com/TomerAberbach/quetie/blob/main/license-apache) ©
[Google](https://github.com/TomerAberbach/quetie/blob/main/notice-apache)
