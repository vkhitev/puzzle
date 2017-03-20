import { pipe, filter, flatten } from 'ramda'
import countInversions from './inversions'

function gridWidth (grid) {
  return grid[0].length
}

function rowOfBlank (grid) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[grid.length - i - 1].includes(0)) {
      return i + 1
    }
  }
  return -1
}

function isEven (num) {
  return (num % 2 === 0)
}

const inversions = pipe(
  flatten,
  filter(x => x !== 0),
  countInversions
)

function solvability (grid) {
  const gridWidthIsEven = isEven(gridWidth(grid))
  const rowOfBlankIsEven = isEven(rowOfBlank(grid))
  const inversionsCountIsEven = isEven(inversions(grid))
  return (!gridWidthIsEven && inversionsCountIsEven) ||
    (gridWidthIsEven && (rowOfBlankIsEven === inversionsCountIsEven))
}

function isSolvable (initial, goal) {
  return (solvability(initial) === solvability(goal))
}

export default isSolvable
