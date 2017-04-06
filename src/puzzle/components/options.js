import astar from '../logic/search/astar'
import bfs from '../logic/search/bfs'
// import idastar from './search/idastar'
import * as heuristics from '../logic/search/heuristic' // Refactor name

export const implementedAlgorithms = {
  '3x3': {
    'A* Hamming': {
      func: astar,
      heuristic: heuristics.hammingDistance
    },
    'A* Manhattan': {
      func: astar,
      heuristic: heuristics.manhattanDistance
    },
    'A* Linear': {
      func: astar,
      heuristic: heuristics.manhattanDistanceWithLinearConflicts
    },
    'BFS': {
      func: bfs
    }
  },
  '4x4': {

  }
}

export const boards = {
  '3x3': {
    rows: 3,
    cols: 3,
    fontSize: '3em',
    goal: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0]
    ]
  },
  '4x4': {
    rows: 4,
    cols: 4,
    fontSize: '2em',
    goal: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0]
    ]
  }
}
