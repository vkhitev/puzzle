import React from 'react'

import PuzzleApplication from './puzzle/components/PuzzleApplication'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import { green100, green500, green700 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
  //   primary1Color: green500,
  //   primary2Color: green700,
  //   primary3Color: green100
  }
})

const App = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className='App'>
      <PuzzleApplication />
    </div>
  </MuiThemeProvider>
)

export default App
