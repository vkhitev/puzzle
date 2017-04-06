import React, { Component } from 'react'

import Board from './Board'
import FlatButton from 'material-ui/FlatButton'

export default class Puzzle extends Component {
  static propTypes = {
    onPressStepForward: React.PropTypes.func.isRequired,
    onPressAutoStep: React.PropTypes.func.isRequired,
    boardSize: React.PropTypes.string.isRequired,
    tiles: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
    direction: React.PropTypes.string,
    isSolved: React.PropTypes.bool.isRequired
  }

  render () {
    return (
      <div className='Puzzle'>
        <Board
          boardSize={this.props.boardSize}
          tiles={this.props.tiles}
          direction={this.props.direction}
        >
          {this.props.isSolved &&
          <div className='board-buttons'>
            <FlatButton label='Step Forward' onClick={this.props.onPressStepForward} />
            <FlatButton label='Auto Step' onClick={this.props.onPressAutoStep} />
          </div>}
        </Board>
      </div>
    )
  }
}
