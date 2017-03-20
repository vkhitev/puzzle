import { pipe, flatten, contains } from 'ramda'
import isSolvable from './is-solvable'

function isSquare (matrix) {
  return matrix.every(row => row.length === matrix.length)
}

const hasEmpty = pipe(flatten, contains(0))

export default function validate (initial, goal) {
  if (!isSquare(initial) || !isSquare(goal)) {
    throw new Error('Wrong state given. Expected square matrix.')
  }

  if (!hasEmpty(initial)) {
    throw new Error('No empty cell found in initial state.')
  }

  if (!isSolvable(initial, goal)) {
    throw new Error('Puzzle is not solvable.')
  }
}
