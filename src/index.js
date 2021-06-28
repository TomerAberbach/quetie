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
