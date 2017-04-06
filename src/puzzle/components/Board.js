import React from 'react'

import { GridList, GridTile } from 'material-ui/GridList'
import Paper from 'material-ui/Paper'

import { boards } from './options'

const BOARD_HEIGHT = 400

const styles = {
  gridList: {
    width: BOARD_HEIGHT,
    margin: 0,
    backgroundColor: 'beige'
  },
  gridTile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative'
  },
  gridTilePaper: {
    cursor: 'pointer',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    height: '100%',
    margin: 10
  }
}

Board.propTypes = {
  boardSize: React.PropTypes.string.isRequired,
  tiles: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
  direction: React.PropTypes.string
}

function Board ({ boardSize, tiles, direction, children }) {
  const option = boards[boardSize]
  return (
    <div className='board-wrapper'>
      <Paper className='board'>
        <GridList
          style={styles.gridList}
          cols={option.cols}
          cellHeight={BOARD_HEIGHT / option.cols}
          padding={0}
        >
          {tiles.map((row, i) => (
            row.map((tile, j) => {
              return (
                <GridTile key={tile} style={styles.gridTile}>
                  <Paper
                    style={{
                      ...styles.gridTilePaper,
                      fontSize: option.fontSize,
                      display: (tile === 0) ? 'none' : 'flex'
                    }}
                    transitionEnabled={false}
                    >
                    {tile}
                  </Paper>
                </GridTile>
              )
            })
          ))}
        </GridList>
        {children}
      </Paper>
    </div>
  )
}

export default Board
