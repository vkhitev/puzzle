function toCoords (state) {
  const coords = {}
  const size = state.length
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      coords[state[i][j]] = [i, j]
    }
  }
  return coords
}

function hammingDistance (goal) {
  return function (state) {
    let result = 0
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (state[i][j] !== goal[i][j] &&
            state[i][j] !== 0) {
          result += 1
        }
      }
    }
    return result
  }
}

function manhattanDistance (goal) {
  const goalCoords = toCoords(goal)
  return function (state) {
    let result = 0
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        const elem = state[i][j]
        if (elem !== 0) {
          const [h, k] = goalCoords[elem]
          result += Math.abs(h - i) + Math.abs(j - k)
        }
      }
    }
    return result
  }
}

function manhattanDistanceWithLinearConflicts (goal) {
  const md = manhattanDistance(goal)
  return function (a) {
    return md(a) + linearConflicts(a, goal)
  }
}

// See https://www.smashingmagazine.com/2016/02/javascript-ai-html-sliding-tiles-puzzle/
function linearConflicts (a, b) {
  let result = 0

  // Row conflicts
  for (let i = 0; i < a.length; i++) {
    result += findConflicts(a, b, i, 1)
  }

  // Column conflicts
  for (let i = 0; i < a[0].length; i++) {
    result += findConflicts(a, b, i, 0)
  }
  return result
}

function findConflicts (a, b, i, dimension) {
  let result = 0
  const tilesRelated = []

  let emptyPos = -1
  for (let c = 0; c < b.length; c++) {
    if (dimension === 1 && b[i][c] === 0 ||
        dimension === 0 && b[c][i] === 0) {
      emptyPos = c
      break
    }
  }
  tilesRelated.push(emptyPos)

  for (let h = 0; h < a.length - 1; h++) {
    for (let k = h + 1; k < a.length; k++) {
      if (tilesRelated.includes(k)) {
        continue
      }
      const hasConflict = dimension === 1
        ? inConflict(i, a[i][h], a[i][k], b, h, k, dimension)
        : inConflict(i, a[h][i], a[k][i], b, h, k, dimension)

      if (hasConflict) {
        result += 2
        tilesRelated.push(h)
        tilesRelated.push(k)
        break
      }
    }
  }

  return result
}

function inConflict (index, a1, a2, b, indexA, indexB, dimension) {
  let indexGoalA = -1
  let indexGoalB = -1

  for (let c = 0; c < b.length; c++) {
    if (dimension === 1 && b[index][c] === a1) {
      indexGoalA = c
    } else if (dimension === 1 && b[index][c] === a2) {
      indexGoalB = c
    } else if (dimension === 0 && b[c][index] === a1) {
      indexGoalA = c
    } else if (dimension === 0 && b[c][index] === a2) {
      indexGoalB = c
    }
  }

  return (
    (indexGoalA >= 0 && indexGoalB >= 0) &&
    ((indexA < indexB && indexGoalA > indexGoalB) ||
      (indexA > indexB && indexGoalA < indexGoalB))
  )
}

export {
  hammingDistance,
  manhattanDistance,
  manhattanDistanceWithLinearConflicts
}
