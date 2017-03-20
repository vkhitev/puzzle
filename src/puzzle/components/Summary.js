import React, { Component } from 'react'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  table: {
    width: '90%',
    margin: '0 auto'
  },
  superHeader: {
    textAlign: 'center',
    fontSize: '1.2em'
  }
}

class Summary extends Component {
  state = {
    openedRow: null
  }

  static propTypes = {
    summary: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        boardSize: React.PropTypes.string.isRequired,
        initialState: React.PropTypes.string.isRequired,
        algorithm: React.PropTypes.string.isRequired,
        time: React.PropTypes.number.isRequired,
        path: React.PropTypes.string.isRequired
      })
    ).isRequired
  }

  openDialog = (rowArr) => {
    if (rowArr.length === 0) {
      return
    }
    this.setState({
      openedRow: rowArr[0]
    })
  }

  dataForRow = () => {
    const dataRow = this.props.summary[this.state.openedRow]
    return (
      <span style={{ lineHeight: '40px' }} >
        Board Size: {dataRow.boardSize} <br />
        Initial State: {dataRow.initialState} <br />
        Algorithm: {dataRow.algorithm} <br />
        Time: {dataRow.time}ms <br />
        Path: {dataRow.path}
      </span>
    )
  }

  closeDialog = () => {
    this.setState({
      openedRow: null
    })
  }

  render () {
    return (
      <div>
        <Table
          className='summary'
          selectable
          style={styles.table}
          onRowSelection={this.openDialog}
          height={'600px'}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan='6' style={styles.superHeader}>
                Summary
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>№</TableHeaderColumn>
              <TableHeaderColumn>Board Size</TableHeaderColumn>
              <TableHeaderColumn>Initial State</TableHeaderColumn>
              <TableHeaderColumn>Algorithm</TableHeaderColumn>
              <TableHeaderColumn>Path</TableHeaderColumn>
              <TableHeaderColumn>Time, ms</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {this.props.summary.map((row, idx) => (
              <TableRow
                key={idx}
                hoverable
                selectable
              >
                <TableRowColumn>{idx + 1}</TableRowColumn>
                <TableRowColumn>{row.boardSize}</TableRowColumn>
                <TableRowColumn>{row.initialState}</TableRowColumn>
                <TableRowColumn>{row.algorithm}</TableRowColumn>
                <TableRowColumn>{row.path}</TableRowColumn>
                <TableRowColumn>{row.time}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          title={`Summary №${this.state.openedRow + 1}`}
          modal={false}
          actions={[
            <FlatButton
              label='Close'
              primary
              onTouchTap={this.closeDialog}
            />
          ]}
          open={this.state.openedRow !== null}
          onRequestClose={this.closeDialog}
        >
          {this.state.openedRow !== null &&
            this.dataForRow()}
        </Dialog>
      </div>
    )
  }
}

export default Summary
