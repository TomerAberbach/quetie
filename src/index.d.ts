/**
 * A class representing a queue, a first-in-first-out (FIFO) data structure,
 * containing values of type `Value`.
 *
 * Each operation has amortized O(1) time complexity.
 */
declare class Queue<Value> {
  /** Creates an empty queue. */
  public constructor()

  /** Returns an iterator over the values in the queue from start to end. */
  public [Symbol.iterator](): Iterator<Value>

  /**
   * Returns the value at the given `index` with wrap around, or `undefined` if
   * the queue is empty.
   */
  public at(index: number): Value | undefined

  /** Adds `value` to the end of the queue. */
  public push(value: Value): void

  /**
   * Removes and returns the value at the start of the queue, or `undefined` if
   * the queue is empty.
   */
  public shift(): Value | undefined

  /** Empties the queue. */
  public clear(): void

  /** Returns the number of elements in the queue. */
  public get size(): number
}

/**
 * A class representing a double-ended queue, a mix between the queue and stack
 * data structures, containing values of type `Value`.
 *
 * Each operation has amortized O(1) time complexity.
 */
declare class Deque<Value> {
  /** Creates and empty deque. */
  public constructor()

  /**
   * Returns the value at the given `index` with wrap around, or `undefined` if
   * the deque is empty.
   */
  public at(index: number): Value | undefined

  /** Adds `value` to the end of the deque. */
  public push(value: Value): void

  /**
   * Removes and returns the value at the end of the deque, or `undefined` if
   * the deque is empty.
   */
  public pop(): Value | undefined

  /** Adds `value` to the start of the deque. */
  public unshift(value: Value): void

  /**
   * Removes and returns the value at the start of the deque, or `undefined` if
   * the deque is empty.
   */
  public shift(): Value | undefined

  /** Returns an iterator over the values in the deque from start to end. */
  public [Symbol.iterator](): Iterator<Value>

  /** Empties the deque. */
  public clear(): void

  /** Returns the number of elements in the deque. */
  public get size(): number
}

export { Deque, Queue }
