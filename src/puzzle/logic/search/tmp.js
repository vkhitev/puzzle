// See https://www.smashingmagazine.com/2016/02/javascript-ai-html-sliding-tiles-puzzle/
function linearConflicts (a, b) {
  let result = 0

  // Row conflicts
  for (let i = 0; i < a.length; i++) {
    result += findRowConflicts(a, b, i)
  }

  // Column conflicts
  for (let i = 0; i < a[0].length; i++) {
    result += findColConflicts(a, b, i)
  }
  return result
}

function findRowConflicts (a, b, i) {
  let result = 0
  const tilesRelated = new Set()
  for (let h = 0; h < a.length - 1 && !tilesRelated.has(h); h++) {
    for (let k = h + 1; k < a.length && !tilesRelated.has(k); k++) {
      if (rowConflict(i, a[i][h], a[i][k], b, h, k)) {
        result += 2
        tilesRelated.add(h)
        tilesRelated.add(k)
      }
    }
  }
  return result
}

function findColConflicts (a, b, i) {
  let result = 0
  const tilesRelated = new Set()
  for (let h = 0; h < a.length - 1; h++) {
    if (tilesRelated.has(h)) {
      continue
    }
    for (let k = h + 1; k < a.length; k++) {
      if (tilesRelated.has(k)) {
        continue
      }
      if (colConflict(i, a[h][i], a[k][i], b, h, k)) {
        result += 2
        tilesRelated.add(h)
        tilesRelated.add(k)
      }
    }
  }
  return result
}

function rowConflict (row, a1, a2, b, ia1, ia2) {
  const ib1 = b.indexOf(a1)
  const ib2 = b.indexOf(a2)
  return (
    (ib1 >= 0 && ib2 >= 0) &&
    ((ia1 < ia2 && ib1 > ib2) ||
      (ia1 > ia2 && ib1 < ib2))
  )
}

function colConflict (col, a1, a2, b, ia1, ia2) {
  let ib1 = -1
  let ib2 = -1
  for (let i = 0; i < b.length; i++) {
    if (b[i][col] === a1) {
      ib1 = i
    } else if (b[i][col] === a1) {
      ib2 = i
    }
  }
  return (
    (ib1 >= 0 && ib2 >= 0) &&
    ((ia1 < ia2 && ib1 > ib2) ||
      (ia1 > ia2 && ib1 < ib2))
  )
}
