// import { clone } from 'ramda'

// import { directions, matrixIndexOf } from './util/shared'
// import validate from './util/validate'
// import Queue from './util/queue'

// function createNode (state, row, col, path) {
//   return { state, row, col, path }
// }

// export default function bfs (initial, goal) {
//   validate(initial, goal)
//   const [erow, ecol] = matrixIndexOf(initial, 0)

//   const visited = new Set()
//   visited.add(initial.toString())

//   const queue = new Queue()
//   queue.enqueue(createNode(initial, erow, ecol, ''))

//   const goalRepr = repr(goal)
//   const size = initial.length

//   while (queue.getLength() > 0) {
//     const current = queue.dequeue()
//     if (repr(current.state) === goalRepr) {
//       return current.path
//     }
//     const row = current.row
//     const col = current.col

//     for (const { dir, pos, cond } of directions) {
//       if (cond(size, row, col)) {
//         const newState = clone(current.state)
//         const [newRow, newCol] = pos(row, col)
//         ;[newState[newRow][newCol], newState[row][col]] =
//           [newState[row][col], newState[newRow][newCol]]

//         const newStateRepr = repr(newState)
//         if (!visited.has(newStateRepr)) {
//           const newPath = current.path + dir
//           const newNode = createNode(newState, newRow, newCol, newPath)
//           queue.enqueue(newNode)
//           visited.add(newStateRepr)
//         }
//       }
//     }
//   }
// }
