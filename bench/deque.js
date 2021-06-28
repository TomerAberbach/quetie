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
