import React, { Component } from 'react'

import Board from './Board'
import FlatButton from 'material-ui/FlatButton'

export default class Puzzle extends Component {
  static propTypes = {
    boardSize: React.PropTypes.string.isRequired,
    tiles: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
    path: React.PropTypes.string
  }

  stepForward = () => {

  }

  autoStep = () => {

  }

  render () {
    const showButtons = this.props.path !== null
    return (
      <div className='Puzzle'>
        <Board
          boardSize={this.props.boardSize}
          tiles={this.props.tiles}
        >
          {showButtons &&
          <div className='board-buttons'>
            <FlatButton label='Step Forward' onClick={this.stepForward} />
            <FlatButton label='Auto Step' onClick={this.autoStep} />
          </div>}
        </Board>
      </div>
    )
  }
}
