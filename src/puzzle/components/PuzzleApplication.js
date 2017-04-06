import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import { flatten, clone } from 'ramda'

import ControlPanel from './ControlPanel'
import Puzzle from './Puzzle'
import Path from './Path'
import Summary from './Summary'

import { boards } from './options'
import shuffleTiles from '../logic/search/util/shuffle-tiles'

const SearchWorker = require('./search-worker.js')

function mapDirectionToBlockIdx (idx, size, direction) {
  switch (direction) {
    case '→':
      return idx - 1
    case '←':
      return idx + 1
    case '↓':
      return idx - size
    case '↑':
      return idx + size
    default:
      return -1
  }
}

function blockToMove (tiles, direction) {
  const size = tiles.length
  const index = flatten(tiles).indexOf(0)
  let newIndex = mapDirectionToBlockIdx(index, size, direction)
  const i = Math.floor(newIndex / size)
  const j = newIndex % size
  return { i, j }
}

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

  interval = null
  worker = new SearchWorker()

  constructor (props) {
    super(props)
    this.worker.onmessage = this.solveSummaryHandler
  }

  // Add one row to summary.
  // If last, set calculating to false and add path block
  solveSummaryHandler = (msg) => {
    const summaryRow = msg.data
    this.setState({
      summary: [summaryRow].concat(this.state.summary),
      path: (this.state.path === null) ? {
        repr: (msg.data.isFirst) ? summaryRow.path : this.state.path.repr,
        position: -1
      } : this.state.path,
      calculating: !msg.data.isLast
    })
  }

  refresh = () => {
    const board = this.state.board
    const tiles = shuffleTiles(board.tiles)
    this.setState({
      board: { ...board, tiles },
      path: null
    })
    this.interval = null
  }

  solve = () => {
    this.worker.postMessage({
      boardSize: this.state.board.name,
      initial: this.state.board.tiles,
      goal: boards[this.state.board.name].goal,
      algorithms: this.state.algorithms
    })
    this.setState({
      calculating: true
    })
    this.interval = null
  }

  setBoardSize = (event, index, boardSize) => {
    this.setState({
      board: {
        name: boardSize,
        tiles: boards[boardSize].goal
      },
      algorithms: []
    }, this.refresh)
  }

  setAlgorithms = (event, index, algorithms) => {
    this.setState({ algorithms })
  }

  makeNewBoard = (oldTiles, direction) => {
    const size = oldTiles.length
    const oldIndex = flatten(oldTiles).indexOf(0)
    const oldI = Math.floor(oldIndex / size)
    const oldJ = oldIndex % size
    const { i, j } = blockToMove(oldTiles, direction)
    const tiles = clone(oldTiles)
    ;[tiles[oldI][oldJ], tiles[i][j]] = [tiles[i][j], tiles[oldI][oldJ]]
    return tiles
  }

  stepForward = () => {
    this.setState({
      path: {
        ...this.state.path,
        position: this.state.path.position + 1
      },
      board: {
        ...this.state.board,
        tiles: this.makeNewBoard(this.state.board.tiles, this.state.path.repr[this.state.path.position + 1])
      }
    }, () => {

    })
  }

  autoStep = () => {
    this.interval = setInterval(this.stepForward, 1000)
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
          onPressStepForward={this.stepForward}
          onPressAutoStep={this.autoStep}
          boardSize={chosenBoard}
          tiles={this.state.board.tiles}
          direction={
            (this.state.path && this.state.path.position !== -1)
            ? this.state.path.repr.charAt(this.state.path.position)
            : null
          }
          isSolved={this.state.path !== null}
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
