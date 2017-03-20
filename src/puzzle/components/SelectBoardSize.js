import React from 'react'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

SelectBoardSize.propTypes = {
  onSelectBoardSize: React.PropTypes.func.isRequired,
  availableBoards: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  chosenBoard: React.PropTypes.string.isRequired
}

function boardMenuItems (availableBoards) {
  return availableBoards.map((name) => (
    <MenuItem
      key={name}
      value={name}
      primaryText={name}
    />
  ))
}

function SelectBoardSize ({
  onSelectBoardSize,
  availableBoards,
  chosenBoard
}) {
  return (
    <SelectField
      className='no-underline'
      value={chosenBoard}
      onChange={onSelectBoardSize}
      style={{ width: '100px', marginRight: '30px' }}
    >
      {boardMenuItems(availableBoards)}
    </SelectField>
  )
}

export default SelectBoardSize
