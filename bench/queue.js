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

import benchmark from 'benchmark'
import fc from 'fast-check'
import YoctoQueue from 'yocto-queue'
import Denque from 'denque'
import DoubleEndedQueue from 'double-ended-queue'
import { Queue } from '../src/index.js'

const wrapArrayInterface = fn =>
  class {
    constructor() {
      this.queue = fn()
    }

    enqueue(value) {
      this.queue.push(value)
    }

    dequeue() {
      return this.queue.shift()
    }
  }

const bench = commands => {
  const implementations = {
    'native-array': wrapArrayInterface(() => []),
    quetie: wrapArrayInterface(() => new Queue()),
    'yocto-queue': YoctoQueue,
    denque: wrapArrayInterface(() => new Denque()),
    'double-ended-queue': wrapArrayInterface(() => new DoubleEndedQueue()),
  }

  const suite = new benchmark.Suite()

  for (const [name, Class] of Object.entries(implementations)) {
    suite.add(name, () => {
      const queue = new Class()
      for (const command of commands) {
        command(queue)
      }
    })
  }

  suite.on(`cycle`, e => console.log(String(e.target))).run()
}

console.log(`Random sequence of 1,000,000 push and shift calls:`)
bench(
  fc.sample(
    fc.oneof(
      fc.anything().map(value => queue => queue.enqueue(value)),
      fc.constant(queue => queue.dequeue()),
    ),
    1000000,
  ),
)
console.log()

console.log(`100,000 push calls followed by 100,000 shift calls:`)
bench(
  Array.from({ length: 100000 }, () => queue => queue.enqueue({})).concat(
    Array.from({ length: 100000 }, () => queue => queue.dequeue()),
  ),
)
