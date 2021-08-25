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

import { expectType } from 'tsd'
import { Deque, Queue } from '../src'

const queue = new Queue<number>()

expectType<number | undefined>(queue.get(0))
expectType<void>(queue.push(1))
expectType<number | undefined>(queue.shift())
expectType<number[]>([...queue])
expectType<void>(queue.clear())
expectType<number>(queue.size)

const deque = new Deque<string>()

expectType<string | undefined>(deque.get(0))
expectType<void>(deque.push(`wow`))
expectType<string | undefined>(deque.pop())
expectType<void>(deque.unshift(`wow`))
expectType<string | undefined>(deque.shift())
expectType<string[]>([...deque])
expectType<void>(deque.clear())
expectType<number>(deque.size)
