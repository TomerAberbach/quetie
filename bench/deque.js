import benchmark from 'benchmark'
import fc from 'fast-check'
import Denque from 'denque'
import DoubleEndedQueue from 'double-ended-queue'
import { Deque } from '../src/index.js'

const bench = commands => {
  const implementations = {
    'native-array': () => [],
    quetie: () => new Deque(),
    denque: () => new Denque(),
    'double-ended-queue': () => new DoubleEndedQueue()
  }

  const suite = new benchmark.Suite()

  for (const [name, create] of Object.entries(implementations)) {
    suite.add(name, () => {
      const deque = create()
      for (const command of commands) {
        command(deque)
      }
    })
  }

  suite.on(`cycle`, e => console.log(String(e.target))).run()
}

console.log(`Random sequence of 1,000,000 push, pop, shift, and unshift calls:`)
bench(
  fc.sample(
    fc.oneof(
      fc.anything().map(value => deque => deque.push(value)),
      fc.constant(deque => deque.pop()),
      fc.anything().map(value => deque => deque.unshift(value)),
      fc.constant(deque => deque.shift())
    ),
    1000000
  )
)
