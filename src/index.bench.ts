import { fc } from '@fast-check/vitest'
import YoctoQueue from 'yocto-queue'
import Denque from 'denque'
import DoubleEndedQueue from 'double-ended-queue'
import { bench, describe } from 'vitest'
import { Deque, Queue } from './index.js'

const randomPushAndShiftCommands = fc.sample(
  fc.oneof(
    fc.anything().map(value => ({ type: `push` as const, value })),
    fc.constant({ type: `shift` as const }),
  ),
  1_000_000,
)
const randomPushPopShiftAndUnshiftCommands = fc.sample(
  fc.oneof(
    fc.anything().map(value => ({ type: `push` as const, value })),
    fc.constant({ type: `pop` as const }),
    fc.anything().map(value => ({ type: `unshift` as const, value })),
    fc.constant({ type: `shift` as const }),
  ),
  1_000_000,
)

describe.each(
  [10, 50, 100, 500, 1000, 5000, 10_000, 50_000, 100_000, 500_000].map(
    count => [count.toLocaleString(), count] as const,
  ),
)(`%s items`, (_, count) => {
  describe(`random sequence of push and shift calls`, () => {
    const commands = randomPushAndShiftCommands.slice(0, count)

    bench(`native array`, () => {
      const array: unknown[] = []
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            array.push(command.value)
            break
          case `shift`:
            array.shift()
            break
        }
      }
      doNotOptimize(array)
    })

    bench(`yocto-queue`, () => {
      const queue = new YoctoQueue<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            queue.enqueue(command.value)
            break
          case `shift`:
            queue.dequeue()
            break
        }
      }
      doNotOptimize(queue)
    })

    bench(`denque`, () => {
      const denque = new Denque<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            denque.push(command.value)
            break
          case `shift`:
            denque.shift()
            break
        }
      }
      doNotOptimize(denque)
    })

    bench(`double-ended-queue`, () => {
      const queue = new DoubleEndedQueue<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            queue.push(command.value)
            break
          case `shift`:
            queue.shift()
            break
        }
      }
      doNotOptimize(queue)
    })

    bench(`quetie`, () => {
      const queue = new Queue<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            queue.push(command.value)
            break
          case `shift`:
            queue.shift()
            break
        }
      }
      doNotOptimize(queue)
    })
  })

  describe(`push calls then shift calls`, () => {
    bench(`native array`, () => {
      const array: unknown[] = []
      for (let i = 0; i < count / 2; i++) {
        array.push({})
      }
      for (let i = 0; i < count / 2; i++) {
        array.shift()
      }
      doNotOptimize(array)
    })

    bench(`yocto-queue`, () => {
      const queue = new YoctoQueue<unknown>()
      for (let i = 0; i < count / 2; i++) {
        queue.enqueue({})
      }
      for (let i = 0; i < count / 2; i++) {
        queue.dequeue()
      }
      doNotOptimize(queue)
    })

    bench(`denque`, () => {
      const denque = new Denque<unknown>()
      for (let i = 0; i < count / 2; i++) {
        denque.push({})
      }
      for (let i = 0; i < count / 2; i++) {
        denque.shift()
      }
      doNotOptimize(denque)
    })

    bench(`double-ended-queue`, () => {
      const queue = new DoubleEndedQueue<unknown>()
      for (let i = 0; i < count / 2; i++) {
        queue.push({})
      }
      for (let i = 0; i < count / 2; i++) {
        queue.shift()
      }
      doNotOptimize(queue)
    })

    bench(`quetie`, () => {
      const queue = new Queue<unknown>()
      for (let i = 0; i < count / 2; i++) {
        queue.push({})
      }
      for (let i = 0; i < count / 2; i++) {
        queue.shift()
      }
      doNotOptimize(queue)
    })
  })

  describe(`random sequence of push, pop, shift, and unshift calls`, () => {
    const commands = randomPushPopShiftAndUnshiftCommands.slice(0, count)
    bench(`native array`, () => {
      const array: unknown[] = []
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            array.push(command.value)
            break
          case `pop`:
            array.pop()
            break
          case `shift`:
            array.shift()
            break
          case `unshift`:
            array.unshift(command.value)
            break
        }
      }
      doNotOptimize(array)
    })

    bench(`denque`, () => {
      const denque = new Denque<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            denque.push(command.value)
            break
          case `pop`:
            denque.pop()
            break
          case `unshift`:
            denque.unshift(command.value)
            break
          case `shift`:
            denque.shift()
            break
        }
      }
      doNotOptimize(denque)
    })

    bench(`double-ended-queue`, () => {
      const queue = new DoubleEndedQueue<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            queue.push(command.value)
            break
          case `pop`:
            queue.pop()
            break
          case `shift`:
            queue.shift()
            break
          case `unshift`:
            queue.unshift(command.value)
            break
        }
      }
      doNotOptimize(queue)
    })

    bench(`quetie`, () => {
      const deque = new Deque<unknown>()
      for (const command of commands) {
        switch (command.type) {
          case `push`:
            deque.push(command.value)
            break
          case `pop`:
            deque.pop()
            break
          case `unshift`:
            deque.unshift(command.value)
            break
          case `shift`:
            deque.shift()
            break
        }
      }
      doNotOptimize(deque)
    })
  })
})

const doNotOptimize = (value: unknown) => {
  // eslint-disable-next-line typescript/no-unsafe-member-access
  ;(global as any).DO_NOT_OPTIMIZE = value
}
