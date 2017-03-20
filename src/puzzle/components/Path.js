import React from 'react'

import Paper from 'material-ui/Paper'

Path.propTypes = {
  path: React.PropTypes.string.isRequired
}

function Path ({ path }) {
  return (
    <Paper className='path'>
      {path}
    </Paper>
  )
}

export default Path
