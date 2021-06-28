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

export class Queue {
  constructor() {
    this.clear()
  }

  _mask(index) {
    return index & (this._data.length - 1)
  }

  _add(index, value) {
    this._data[index] = value

    if (++this._size < this._data.length) {
      return
    }

    const previousCapacity = this._data.length
    this._data.length <<= 1
    this._data.copyWithin(previousCapacity, 0, this._startIndex)

    this._data.fill(undefined, 0, this._startIndex)
    this._data.fill(undefined, previousCapacity + this._startIndex)
  }

  push(value) {
    this._add(this._mask(this._startIndex + this._size), value)
  }

  _remove(index) {
    this._size--
    const value = this._data[index]
    this._data[index] = undefined
    return value
  }

  shift() {
    if (this._size === 0) {
      return undefined
    }

    const value = this._remove(this._startIndex)
    this._startIndex = this._mask(this._startIndex + 1)
    return value
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._size; i++) {
      yield this._data[this._mask(this._startIndex + i)]
    }
  }

  clear() {
    this._data = Array.from({ length: 16 })
    this._startIndex = 0
    this._size = 0
  }

  get size() {
    return this._size
  }
}

export class Deque extends Queue {
  unshift(value) {
    this._add((this._startIndex = this._mask(this._startIndex - 1)), value)
  }

  pop() {
    return this._size === 0
      ? undefined
      : this._remove(this._mask(this._startIndex + this._size - 1))
  }
}
