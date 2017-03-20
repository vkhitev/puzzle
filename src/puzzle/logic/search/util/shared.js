const directions = [
  { dir: '↑', pos: (row, col) => [row - 1, col], cond: (size, row, col) => row > 0 },
  { dir: '↓', pos: (row, col) => [row + 1, col], cond: (size, row, col) => row < size - 1 },
  { dir: '←', pos: (row, col) => [row, col - 1], cond: (size, row, col) => col > 0 },
  { dir: '→', pos: (row, col) => [row, col + 1], cond: (size, row, col) => col < size - 1 }
]

const opposite = {
  '↑': '↓',
  '↓': '↑',
  '←': '→',
  '→': '←'
}

// matrixIndexOf :: Matrix -> Any -> [Int, Int]
function matrixIndexOf (matrix, value) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === value) {
        return [i, j]
      }
    }
  }
  return [-1, -1]
}

export {
  directions,
  opposite,
  matrixIndexOf
}
