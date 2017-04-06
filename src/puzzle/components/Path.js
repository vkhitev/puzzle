import React from 'react'

import Paper from 'material-ui/Paper'

Path.propTypes = {
  path: React.PropTypes.shape({
    repr: React.PropTypes.string.isRequired,
    position: React.PropTypes.number.isRequired
  }).isRequired
}

function Path ({ path }) {
  return (
    <Paper className='path'>
      {path.repr.split('').map((direction, idx) => (
        <span key={idx} style={{
          backgroundColor: (idx === path.position) ? 'rgba(0, 0, 0, 0.2)' : 'inherit',
          display: 'inline-block',
          width: 40,
          height: 40
        }}>
          {direction}
        </span>
      ))}
    </Paper>
  )
}

export default Path
