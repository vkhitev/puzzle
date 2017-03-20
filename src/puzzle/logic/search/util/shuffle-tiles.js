import { clone } from 'ramda'

import isSolvable from './is-solvable'

function shuffleTwoDim (array) {
  const shuffled = clone(array)
  for (let i = shuffled.length - 1; i > 0; i--) {
    for (let j = shuffled[i].length - 1; j > 0; j--) {
      let m = Math.floor(Math.random() * (i + 1))
      let n = Math.floor(Math.random() * (j + 1))
      ;[shuffled[i][j], shuffled[m][n]] = [shuffled[m][n], shuffled[i][j]]
    }
  }
  return shuffled
}

function shuffleTiles (finalTiles) {
  let newTiles = shuffleTwoDim(finalTiles)
  while (!isSolvable(newTiles, finalTiles)) {
    newTiles = shuffleTwoDim(newTiles)
  }
  return newTiles
}

export default shuffleTiles
