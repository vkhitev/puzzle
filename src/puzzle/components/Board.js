import React from 'react'
import { Motion, spring } from 'react-motion'

import { flatten } from 'ramda'

import { GridList, GridTile } from 'material-ui/GridList'
import Paper from 'material-ui/Paper'

import { boards } from './options'

const BOARD_HEIGHT = 400

const mapDirectionToCoord = {
  '→': { x: -BOARD_HEIGHT / 3, y: 0 },
  '←': { x: BOARD_HEIGHT / 3, y: 0 },
  '↓': { x: 0, y: -BOARD_HEIGHT / 3 },
  '↑': { x: 0, y: BOARD_HEIGHT / 3 }
}

function mapDirectionToBlockIdx (idx, size, direction) {
  switch (direction) {
    case '←':
      return idx - 1
    case '→':
      return idx + 1
    case '↑':
      return idx - size
    case '↓':
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
  console.log(`Zero index: ${index}`)
  console.log(`New zero index: ${i}, ${j}`)
  return { i, j }
}

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
  },
  motion (direction) {
    return {
      x: spring((direction) ? mapDirectionToCoord[direction].x : 0),
      y: spring((direction) ? mapDirectionToCoord[direction].y : 0)
    }
  }
}

Board.propTypes = {
  boardSize: React.PropTypes.string.isRequired,
  tiles: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
  direction: React.PropTypes.string
}

function Board ({ boardSize, tiles, direction, children }) {
  const option = boards[boardSize]
  const { i: im, j: jm } = blockToMove(tiles, direction)
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
                  <Motion style={styles.motion(direction)}>
                    {({ x, y }) => {
                      return (
                        <Paper
                          style={{
                            ...styles.gridTilePaper,
                            fontSize: option.fontSize,
                            display: (tile === 0) ? 'none' : 'flex'
                            // transform: (i === im && j === jm) ? `translate3d(${x}px, ${y}px, 0)` : 'none'
                          }}
                          transitionEnabled={false}
                        >
                          {tile}
                        </Paper>
                      )
                    }}
                  </Motion>
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
