import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import SelectAlgorithms from './SelectAlgorithms'
import SelectBoardSize from './SelectBoardSize'

import { boards, implementedAlgorithms } from './options'

ControlPanel.propTypes = {
  onPressRefresh: React.PropTypes.func.isRequired,
  onPressSolve: React.PropTypes.func.isRequired,
  onSelectBoardSize: React.PropTypes.func.isRequired,
  onSelectAlgorithms: React.PropTypes.func.isRequired,
  chosenBoard: React.PropTypes.string.isRequired,
  chosenAlgorithms: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  calculating: React.PropTypes.bool.isRequired
}

function ControlPanel ({
  onPressRefresh,
  onPressSolve,
  onSelectBoardSize,
  onSelectAlgorithms,
  chosenBoard,
  chosenAlgorithms,
  calculating
}) {
  const availableBoards = Object.keys(boards)
  const availableAlgorithms = Object.keys(implementedAlgorithms[chosenBoard])
  return (
    <Toolbar className='control-panel'>
      <ToolbarGroup>
        <ToolbarTitle text='Puzzle' />
        <ToolbarSeparator />
      </ToolbarGroup>
      <ToolbarGroup>
        <SelectBoardSize
          onSelectBoardSize={onSelectBoardSize}
          availableBoards={availableBoards}
          chosenBoard={chosenBoard}
        />
        <SelectAlgorithms
          onSelectAlgorithms={onSelectAlgorithms}
          availableAlgorithms={availableAlgorithms}
          chosenAlgorithms={chosenAlgorithms}
        />
        <RaisedButton
          secondary
          label='Refresh'
          onClick={onPressRefresh}
          disabled={calculating}
        />
        <RaisedButton
          primary
          label='Solve'
          onClick={onPressSolve}
          disabled={calculating || chosenAlgorithms.length === 0}
        />
      </ToolbarGroup>
    </Toolbar>
  )
}

export default ControlPanel
