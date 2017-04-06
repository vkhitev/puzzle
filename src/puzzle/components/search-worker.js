/* eslint-env worker */

import { flatten } from 'ramda'

import { implementedAlgorithms } from './options'
import timer from '../logic/search/util/timer'

const timedSolve = timer((func, initial, goal, heuristic) => {
  return func(initial, goal, heuristic)
})

function invertPath (path) {
  return path.split('').map(direction => {
    switch (direction) {
      case '←':
        return '→'
      case '→':
        return '←'
      case '↑':
        return '↓'
      case '↓':
        return '↑'
      default:
        return -1
    }
  }).join('')
}

onmessage = function (msg) {
  const { boardSize, initial, goal, algorithms } = msg.data
  algorithms.forEach((algorithm, i) => {
    const { func, heuristic } = implementedAlgorithms[boardSize][algorithm]
    const { value, time } = timedSolve(func, initial, goal, heuristic)
    postMessage({
      boardSize: boardSize,
      initialState: flatten(initial).join(' '),
      algorithm: algorithm,
      time: time,
      path: invertPath(value),
      isLast: (i === algorithms.length - 1),
      isFirst: (i === 0)
    })
  })
}
