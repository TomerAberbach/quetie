/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
