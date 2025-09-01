/* eslint-disable typescript/no-invalid-void-type */
/* eslint-disable typescript/no-confusing-void-expression */
import { fc, test } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import { Deque, Queue } from './index.js'

const toCommands = <M extends object, R>(
  description: Record<string, (model: M, real: R, ...args: any[]) => void>,
): Record<string, (...args: unknown[]) => fc.Command<M, R>> =>
  Object.fromEntries(
    Object.entries(description).map(([name, check]) => [
      `${name}Command`,
      (...args: unknown[]) => ({
        check: () => true,
        run: (model: M, real: R) => check(model, real, ...args),
        toString: () => `${name}(${args.map(fc.stringify).join(`, `)})`,
      }),
    ]),
  )

type DequeInternals = {
  _data: unknown[]
  _startIndex: number
  _size: number
}

const assertUndefinedInUnusedRanges = ({
  _data: data,
  _startIndex: startIndex,
  _size: size,
}: DequeInternals) => {
  let endIndex = startIndex + size
  if (endIndex > data.length) {
    endIndex %= data.length
  }

  if (startIndex < endIndex) {
    for (let i = 0; i < startIndex; i++) {
      expect(data[i]).toBeUndefined()
    }

    for (let i = endIndex; i < data.length; i++) {
      expect(data[i]).toBeUndefined()
    }
  } else {
    for (let i = endIndex; i < startIndex; i++) {
      expect(data[i]).toBeUndefined()
    }
  }
}

const {
  getCommand,
  pushCommand,
  popCommand,
  unshiftCommand,
  shiftCommand,
  sizeCommand,
  spreadCommand,
} = toCommands<unknown[], Deque<unknown>>({
  get: (model, real, index: number) => {
    expect(real.at(index)).toBe(
      model[((index % model.length) + model.length) % model.length],
    )
  },
  push: (model, real, value: unknown) => {
    expect(real.push(value)).toBeUndefined()
    model.push(value)

    assertUndefinedInUnusedRanges(real as unknown as DequeInternals)
  },
  pop: (model, real) => {
    expect(real.pop()).toBe(model.pop())

    assertUndefinedInUnusedRanges(real as unknown as DequeInternals)
  },
  unshift: (model, real, value: unknown) => {
    expect(real.unshift(value)).toBeUndefined()
    model.unshift(value)

    assertUndefinedInUnusedRanges(real as unknown as DequeInternals)
  },
  shift: (model, real) => {
    expect(real.shift()).toBe(model.shift())

    assertUndefinedInUnusedRanges(real as unknown as DequeInternals)
  },
  size: (model, real) => {
    expect(real.size).toBe(model.length)
  },
  spread: (model, real) => {
    expect([...real]).toStrictEqual(model)
  },
})

test.prop([
  fc.commands(
    [
      fc.integer().map(getCommand!),
      fc.integer().map(pushCommand!),
      fc.constant(popCommand!()),
      fc.integer().map(unshiftCommand!),
      fc.constant(shiftCommand!()),
      fc.constant(sizeCommand!()),
      fc.constant(spreadCommand!()),
    ],
    { size: `max`, maxCommands: 1000 },
  ),
])(`Deque behaves like an array and does not prevent GC`, commands => {
  let real: Deque<unknown>

  fc.modelRun(() => ({ model: [], real: (real = new Deque()) }), commands)

  real!.clear()
  expect([...real!]).toBeEmpty()
})

test.skip(`types`, () => {
  const queue = new Queue<number>()

  expectTypeOf<number | undefined>(queue.at(0))
  expectTypeOf<void>(queue.push(1))
  expectTypeOf<number | undefined>(queue.shift())
  expectTypeOf<number[]>([...queue])
  expectTypeOf<void>(queue.clear())
  expectTypeOf<number>(queue.size)

  const deque = new Deque<string>()

  expectTypeOf<string | undefined>(deque.at(0))
  expectTypeOf<void>(deque.push(`wow`))
  expectTypeOf<string | undefined>(deque.pop())
  expectTypeOf<void>(deque.unshift(`wow`))
  expectTypeOf<string | undefined>(deque.shift())
  expectTypeOf<string[]>([...deque])
  expectTypeOf<void>(deque.clear())
  expectTypeOf<number>(deque.size)
})
