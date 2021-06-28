/**
 * A class representing a queue, a first-in-first-out (FIFO) data structure,
 * containing values of type `Value`.
 *
 * Each operation has amortized O(1) time complexity.
 */
export class Queue<Value> {
  /** Creates an empty queue. */
  constructor()

  /** Returns an iterator over the values in the queue from start to end. */
  [Symbol.iterator](): Iterator<Value>

  /** Adds `value` to the end of the queue. */
  push(value: Value): void

  /**
   * Removes and returns the value at the start of the queue, or `undefined` if
   * the queue is empty.
   */
  shift(): Value | undefined

  /** Empties the queue. */
  clear(): void

  /** Returns the number of elements in the queue. */
  get size(): number
}

/**
 * A class representing a double-ended queue, a mix between the queue and stack
 * data structures, containing values of type `Value`.
 *
 * Each operation has amortized O(1) time complexity.
 */
export class Deque<Value> {
  /** Creates and empty deque. */
  constructor()

  /** Adds `value` to the end of the deque. */
  push(value: Value): void

  /**
   * Removes and returns the value at the end of the deque, or `undefined` if
   * the deque is empty.
   */
  pop(): Value | undefined

  /** Adds `value` to the start of the deque. */
  unshift(value: Value): void

  /**
   * Removes and returns the value at the start of the deque, or `undefined` if
   * the deque is empty.
   */
  shift(): Value | undefined

  /** Returns an iterator over the values in the deque from start to end. */
  [Symbol.iterator](): Iterator<Value>

  /** Empties the deque. */
  clear(): void

  /** Returns the number of elements in the deque. */
  get size(): number
}
