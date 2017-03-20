import React, { Component } from 'react'
import { flatten } from 'ramda'

import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'

import ControlPanel from './ControlPanel'
import Puzzle from './Puzzle'
import Path from './Path'
import Summary from './Summary'

import { boards, implementedAlgorithms } from './options'
import shuffleTiles from '../logic/search/util/shuffle-tiles'

import timer from '../logic/search/util/timer'

const timedSolve = timer((func, initial, goal, heuristic) => {
  return func(initial, goal, heuristic)
})

export default class PuzzleApplication extends Component {
  state = {
    board: {
      name: '3x3',
      tiles: shuffleTiles(boards['3x3'].goal)
    },
    algorithms: [],
    path: null,
    summary: [],
    calculating: false
  }

  constructor (props) {
    super(props)
    // this.worker = new Worker('./worker.js')
    // this.worker.addEventListener('message', () => {
    //   console.log('Message received')
    // })
  }

  refresh = () => {
    const board = this.state.board
    const tiles = shuffleTiles(board.tiles)
    this.setState({
      board: { ...board, tiles },
      path: null
    })
  }

  solve = () => {
    this.setState({
      calculating: true
    }, () => {
      // this.worker.postMessage({
      //   boardSize: this.state.board.name,
      //   initial: this.state.board.tiles,
      //   goal: boards[this.state.board.name].goal,
      //   algorithms: this.state.algorithms
      // })
    })

      // const newSummary = []
      // algorithms.forEach((algorithm) => {
      //   const { func, heuristic } = implementedAlgorithms[boardName][algorithm]
      //   const { value, duration } = timedSolve(func, initial, goal, heuristic)
      //   newSummary.unshift({
      //     boardSize: boardName,
      //     initialState: flatten(initial).join(' '),
      //     algorithm: algorithm,
      //     time: duration,
      //     path: value
      //   })
      // })
      // const path = newSummary[0].path
      // this.setState({
      //   path: path,
      //   summary: newSummary.concat(this.state.summary),
      //   calculating: false
      // })
  }

  setBoardSize = (event, index, boardSize) => {
    this.setState({
      board: {
        name: boardSize,
        tiles: boards[boardSize].goal
      }
    }, this.refresh)
  }

  setAlgorithms = (event, index, algorithms) => {
    this.setState({ algorithms })
  }

  render () {
    const chosenBoard = this.state.board.name
    const chosenAlgorithms = this.state.algorithms

    return (
      <Paper className='puzzle-application'>
        <ControlPanel
          onPressRefresh={this.refresh}
          onPressSolve={this.solve}
          onSelectBoardSize={this.setBoardSize}
          onSelectAlgorithms={this.setAlgorithms}
          chosenBoard={chosenBoard}
          chosenAlgorithms={chosenAlgorithms}
        />
        <Puzzle
          boardSize={chosenBoard}
          tiles={this.state.board.tiles}
          path={this.state.path}
        />
        {this.state.calculating &&
        <CircularProgress />}
        {this.state.path !== null &&
        <Path
          path={this.state.path}
        />}
        <Summary
          summary={this.state.summary}
        />
      </Paper>
    )
  }
}
