import React from 'react'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

SelectAlgorithms.propTypes = {
  onSelectAlgorithms: React.PropTypes.func.isRequired,
  availableAlgorithms: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  chosenAlgorithms: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}

function selectionRenderer (values) {
  switch (values.length) {
    case 0:
      return ''
    case 1:
      return values[0]
    default:
      return `${values.length} algorithms`
  }
}

function algorithmMenuItems (availableAlgorithms, chosenAlgorithms) {
  return availableAlgorithms.map((name) => (
    <MenuItem
      key={name}
      insetChildren
      checked={chosenAlgorithms && chosenAlgorithms.includes(name)}
      value={name}
      primaryText={name}
    />
  ))
}

function SelectAlgorithms ({
  onSelectAlgorithms,
  availableAlgorithms,
  chosenAlgorithms
}) {
  return (
    <SelectField
      className='no-underline'
      multiple
      hintText='Select algorithms'
      value={chosenAlgorithms}
      onChange={onSelectAlgorithms}
      selectionRenderer={selectionRenderer}
      style={{ width: '180px' }}
    >
      {algorithmMenuItems(availableAlgorithms, chosenAlgorithms)}
    </SelectField>
  )
}

export default SelectAlgorithms
