export default function timer (fn) {
  return function (...args) {
    const start = new Date()
    const value = fn.apply(this, args)
    const duration = new Date() - start
    return { value, duration }
  }
}
