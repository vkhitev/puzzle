import PriorityQueue from 'js-priority-queue'
import { clone } from 'ramda'

import { directions, matrixIndexOf, opposite } from './util/shared'
import validate from './util/validate'

function createNode (value, state, repr, row, col, depth, path) {
  return { value, state, repr, row, col, depth, path }
}

export default function astar (initial, goal, heuristic) {
  validate(initial, goal)
  const finalHeuristic = heuristic(goal)
  const [erow, ecol] = matrixIndexOf(initial, 0)

  const initialRepr = initial.toString()
  const goalRepr = goal.toString()

  const visited = new Set()
  visited.add(initialRepr)

  const queue = new PriorityQueue({ comparator: (a, b) => a.value - b.value })
  const initialNode = createNode(0, initial, initialRepr, erow, ecol, 0, '')
  queue.queue(initialNode)

  const size = initial.length

  while (queue.length > 0) {
    const current = queue.dequeue()
    if (current.repr === goalRepr) {
      return current.path
    }
    const row = current.row
    const col = current.col
    const lastMove = current.path[current.path.length - 1]

    for (const { dir, pos, cond } of directions) {
      if (dir === opposite[lastMove]) {
        continue
      }
      if (cond(size, row, col)) {
        const newState = clone(current.state)
        const [newRow, newCol] = pos(row, col)
        ;[newState[newRow][newCol], newState[row][col]] =
          [newState[row][col], newState[newRow][newCol]]

        const newStateRepr = newState.toString()
        if (!visited.has(newStateRepr)) {
          const newDepth = current.depth + 1
          const newPath = current.path + dir
          const newValue = newDepth + finalHeuristic(newState)
          const newNode = createNode(newValue, newState, newStateRepr, newRow, newCol, newDepth, newPath)
          queue.queue(newNode)
          visited.add(newStateRepr)
        }
      }
    }
  }
}
