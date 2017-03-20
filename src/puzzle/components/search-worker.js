/* eslint-env worker */

import { flatten } from 'ramda'

import { implementedAlgorithms } from './options'
import timer from '../logic/search/util/timer'

const timedSolve = timer((func, initial, goal, heuristic) => {
  return func(initial, goal, heuristic)
})

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
      path: value,
      isLast: (i === algorithms.length - 1),
      isFirst: (i === 0)
    })
  })
}
