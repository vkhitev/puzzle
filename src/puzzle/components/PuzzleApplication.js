import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'

import ControlPanel from './ControlPanel'
import Puzzle from './Puzzle'
import Path from './Path'
import Summary from './Summary'

import { boards } from './options'
import shuffleTiles from '../logic/search/util/shuffle-tiles'

const SearchWorker = require('./search-worker.js')

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

  worker = new SearchWorker()

  constructor (props) {
    super(props)
    this.worker.onmessage = (msg) => {
      // Add one row to summary.
      // If last, set calculating to false and add path block
      const summaryRow = msg.data
      this.setState({
        summary: [summaryRow].concat(this.state.summary),
        path: (msg.data.isFirst) ? summaryRow.path : this.state.path,
        calculating: !msg.data.isLast
      })
    }
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
      this.worker.postMessage({
        boardSize: this.state.board.name,
        initial: this.state.board.tiles,
        goal: boards[this.state.board.name].goal,
        algorithms: this.state.algorithms
      })
    })
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
          calculating={this.state.calculating}
        />
        <Puzzle
          boardSize={chosenBoard}
          tiles={this.state.board.tiles}
          path={this.state.path}
        />
        {this.state.path !== null &&
        <Path
          path={this.state.path}
        />}
        {this.state.calculating &&
        <CircularProgress />}
        <Summary
          summary={this.state.summary}
        />
      </Paper>
    )
  }
}
