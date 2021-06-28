import { fc } from 'ava-fast-check'

const toCommands = description =>
  Object.fromEntries(
    Object.entries(description).map(([name, check]) => [
      `${name}Command`,
      (...args) => ({
        check: () => true,
        run: ({ t, model }, real) => check(t, model, real, ...args),
        toString: () => `${name}(${args.map(fc.stringify).join(`, `)})`
      })
    ])
  )

export default toCommands
