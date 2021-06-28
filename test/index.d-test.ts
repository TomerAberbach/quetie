import { expectType } from 'tsd'
import { Deque, Queue } from '../src'

const queue = new Queue<number>()

expectType<void>(queue.push(1))
expectType<number | undefined>(queue.shift())
expectType<number[]>([...queue])
expectType<void>(queue.clear())
expectType<number>(queue.size)

const deque = new Deque<string>()

expectType<void>(deque.push(`wow`))
expectType<string | undefined>(deque.pop())
expectType<void>(deque.unshift(`wow`))
expectType<string | undefined>(deque.shift())
expectType<string[]>([...deque])
expectType<void>(deque.clear())
expectType<number>(deque.size)
