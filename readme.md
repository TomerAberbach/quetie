<h1 align="center">
  quetie
</h1>

<div align="center">
  <a href="https://npmjs.org/package/quetie">
    <img src="https://badgen.now.sh/npm/v/quetie" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/quetie/actions">
    <img src="https://github.com/TomerAberbach/quetie/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://bundlephobia.com/result?p=quetie">
    <img src="https://badgen.net/bundlephobia/minzip/quetie" alt="minzip size" />
  </a>
</div>

<div align="center">
  Just the cutest and tiniest queue/deque implementation!
</div>

## Features

- **Tiny:** ~367 bytes minzipped!
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
import { Queue, Deque } from 'quetie'

const queue = new Queue()

queue.push(1)
queue.push(2)
queue.push(3)

console.log(queue.size)
//=> 3

console.log(queue.get(0))
console.log(queue.get(1))
console.log(queue.get(2))
console.log(queue.get(3))
console.log(queue.get(-1))
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

console.log(deque.get(0))
console.log(deque.get(1))
console.log(deque.get(2))
console.log(deque.get(3))
console.log(deque.get(-1))
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

## Benchmarks

Higher is better!

### `Queue`

Random sequence of 1,000,000 `push` and `shift` calls:

```
native array x 24.16 ops/sec ±1.50% (44 runs sampled)
quetie x 69.70 ops/sec ±0.31% (72 runs sampled)
yocto-queue x 65.58 ops/sec ±0.19% (68 runs sampled)
denque x 63.27 ops/sec ±0.30% (66 runs sampled)
double-ended-queue x 30.84 ops/sec ±0.42% (55 runs sampled)
```

100,000 `push` calls followed by 100,000 `shift` calls:

```
native array x 1.21 ops/sec ±0.52% (8 runs sampled)
quetie x 196 ops/sec ±3.23% (83 runs sampled)
yocto-queue x 154 ops/sec ±1.11% (87 runs sampled)
denque x 177 ops/sec ±1.72% (82 runs sampled)
double-ended-queue x 132 ops/sec ±2.99% (63 runs sampled)
```

### `Deque`

Random sequence of 1,000,000 `push`, `pop`, `shift`, and `unshift` calls:

```
native array x 23.83 ops/sec ±1.60% (44 runs sampled)
quetie x 65.25 ops/sec ±0.40% (68 runs sampled)
denque x 62.34 ops/sec ±0.30% (65 runs sampled)
double-ended-queue x 40.98 ops/sec ±0.36% (55 runs sampled)
```

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/quetie/issues/new).

For pull requests, please read the
[contributing guidelines](https://github.com/TomerAberbach/quetie/blob/master/contributing.md).

## License

[Apache 2.0](https://github.com/TomerAberbach/quetie/blob/master/license)

This is not an official Google product.
