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

import { fc, testProp } from 'ava-fast-check'
import { Deque } from '../src/index.js'
import toCommands from './helpers/to-commands.js'

const assertUndefinedInUnusedRanges = (
  t,
  { _data: data, _startIndex: startIndex, _size: size },
) => {
  let endIndex = startIndex + size
  if (endIndex > data.length) {
    endIndex %= data.length
  }

  if (startIndex < endIndex) {
    for (let i = 0; i < startIndex; i++) {
      t.is(data[i], undefined)
    }

    for (let i = endIndex; i < data.length; i++) {
      t.is(data[i], undefined)
    }
  } else {
    for (let i = endIndex; i < startIndex; i++) {
      t.is(data[i], undefined)
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
} = toCommands({
  get(t, model, real, index) {
    t.is(
      real.get(index),
      model[((index % model.length) + model.length) % model.length],
    )
  },
  push(t, model, real, value) {
    t.is(real.push(value), undefined)
    model.push(value)

    assertUndefinedInUnusedRanges(t, real)
  },
  pop(t, model, real) {
    t.is(real.pop(), model.pop())

    assertUndefinedInUnusedRanges(t, real)
  },
  unshift(t, model, real, value) {
    t.is(real.unshift(value), undefined)
    model.unshift(value)

    assertUndefinedInUnusedRanges(t, real)
  },
  shift(t, model, real) {
    t.is(real.shift(), model.shift())

    assertUndefinedInUnusedRanges(t, real)
  },
  size(t, model, real) {
    t.is(real.size, model.length)
  },
  spread(t, model, real) {
    t.deepEqual([...real], model)
  },
})

testProp(
  `Deque behaves like an array and does not prevent GC`,
  [
    fc.commands(
      [
        fc.integer().map(getCommand),
        fc.anything().map(pushCommand),
        fc.constant(popCommand()),
        fc.anything().map(unshiftCommand),
        fc.constant(shiftCommand()),
        fc.constant(sizeCommand()),
        fc.constant(spreadCommand()),
      ],
      { maxCommands: 10000 },
    ),
  ],
  (t, commands) => {
    let real

    fc.modelRun(
      () => ({
        model: { t, model: [] },
        real: (real = new Deque()),
      }),
      commands,
    )

    real.clear()
    t.deepEqual([...real], [])
  },
)
