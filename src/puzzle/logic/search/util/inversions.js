export default function countInversions (originalArray) {
  const array = originalArray.slice()

  if (array === undefined) {
    throw new Error('Array must be defined to count inversions')
  }
  if (array.length === 0 || array.length === 1) {
    return 0
  }

  let invCount = 0
  sort(array)
  return invCount

  function sort (arr) {
    if (arr.length === 1) {
      return arr
    }
    const right = arr.splice(Math.floor(arr.length / 2), arr.length - 1)
    return merge(sort(arr), sort(right))
  }

  function merge (left, right) {
    const merged = []
    let l = 0
    let r = 0
    let multiplier = 0
    while (l < left.length || r < right.length) {
      if (left[l] < right[r] || r === right.length) {
        merged.push(left[l])
        l++
        invCount += multiplier
      } else {
        merged.push(right[r])
        r++
        multiplier++
      }
    }
    return merged
  }
}
