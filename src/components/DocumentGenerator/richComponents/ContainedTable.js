import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
import { Table, TableRow, TableCell } from "@material-ui/core"
// Resize
import Resizable from "re-resizable"
// RichEditor
import RichEditor from "../inputs/RichEditor"
// Utils
import { isEmpty, isNil } from "ramda"
import ContextOptions from "../ContextOptions"

const styles = theme => ({
  initText: {
    ...theme.typography.subheading, // subheading
    color: theme.palette.secondary.main,
    padding: theme.spacing.unit * 4,
    font: theme.typography.display4,
    display: "block",
    textAlign: "center",
  },
  containedTable: {
    overflow: "hidden",
    border: "3px solid purple",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "solid 1px #ddd",
    background: "#f0f0f0",
  },
  containedRow: {
    // marginTop: "10px",
    display: "flex",
    alignItems: "center",
    margin: "10px",
    overflow: "hidden",
    border: "3px solid pink",
  },
  cell: {
    flex: "1 1 0",
  },
})

const defaultTableSize = {
  width: 550,
  height: 300,
}

// Resizable Table outer!
// Reuse this
// Resize div => https://github.com/bokuweb/re-resizable

// OR
// an actual util function
// https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
// Good read and maybe implement some sort of component.
// But for now the STRML/react-resizable will fit our case. especially the handles for on hover only. i.e print. RAD MVP
// User that third party resize component to be some sort of super. Ie resizabl;eTable. resizblae row, and cols
class ContainedTable extends Component {
  constructor(props) {
    super(props)
    const { classes, section, pageAttributes } = this.props
    const { rawContent } = section

    if (isNil(rawContent)) {
      const initialTable = this._initTable(3, 3)
      this.update(initialTable)
      this.state = {
        tableSize: defaultTableSize,
      }
    } else {
      const { table } = rawContent
      console.log("Peek at the table => ", table)
      this.state = {
        visibleContext: false,
        interestedRowIndex: null,
        contextDimensions: {
          x: null,
          y: null,
        },
        tableSize: {
          width: table.tableSize.width,
          height: table.tableSize.height,
        },
      }
    }
  }
  update = table => {
    const { classes, section } = this.props
    const { id, type, rawContent } = section
    const updatedSection = { id, type, rawContent: table }
    this.props.update(updatedSection)
  }

  /**
   * Update section for document. use Fragments for a section
   * Then use Ramda to update a Section Fragment cell
   * Remember to convert sections to GrapgQl Fragments
   * https://www.apollographql.com/docs/react/advanced/fragments.html
   */
  _updateCell = (document, rIdx, cIdx) => {
    const { section } = this.props

    const updatedTableSection = section.rawContent.table
    updatedTableSection.rows[rIdx].cells[cIdx] = document

    const json = {
      table: {
        ...updatedTableSection,
      },
    }

    return this.update(json)
  }

  tableIsSmallerThanRows = () => {}

  _resizeRow = (height, rIdx) => {
    const { section } = this.props

    const updatedTableSection = section.rawContent.table
    updatedTableSection.rows[rIdx].rowHeight = height

    const json = {
      table: {
        ...updatedTableSection,
      },
    }

    console.log("resize Row Table no wlooks like => ", json)

    return this.update(json)
  }

  _resizeTable = (width, height) => {
    this.setState({
      tableSize: {
        width: width,
        height: height,
      },
    })
    const { section } = this.props
    const json = {
      table: {
        ...section.rawContent.table,
        tableSize: {
          width: width,
          height: height,
        },
      },
    }
    console.log("Resized Object to update looks like ", json)
    return this.update(json)
  }

  handleTableClick = (e, colIdx) => {
    if (e.nativeEvent.which === 1) {
      // do nothing, it should always hit below anyway?
    } else if (e.nativeEvent.which === 3) {
      this.handleTableContext(e, colIdx)
      // alert("Right Click On the table")
    }
  }

  handleTableContext = (event, colIdx) => {
    event.preventDefault()
    this.setState({
      visibleContext: true,
      interestedColIndex: colIdx,
    })
    this.setState({
      contextDimensions: {
        x: event.clientX,
        y: event.clientY,
      },
    })
  }

  handleRowClick = (e, rIdx) => {
    if (e.nativeEvent.which === 1) {
      // do nothing, it should always hit below anyway?
    } else if (e.nativeEvent.which === 3) {
      this.handleRowContext(e, rIdx)
      // alert("Right Click On the table")
    }
  }

  handleRowContext = (event, rIdx) => {
    event.preventDefault()
    this.setState({
      visibleContext: true,
      interestedRowIndex: rIdx,
    })
    this.setState({
      contextDimensions: {
        x: event.clientX,
        y: event.clientY,
      },
    })
  }

  _addRow = () => {
    // alert(this.state.interestedRowIndex)
    // alert("Check console for table json")
    const { section } = this.props
    const newRow = this._initRows(1, section.rawContent.table.num_of_cols)
    const updatedRows = section.rawContent.table.rows.concat(newRow)
    console.log("_addRow fro section table section => ", section)
    console.log("New Row To add => ", newRow)

    const json = {
      table: {
        ...section.rawContent.table,
        rows: updatedRows,
        num_of_cols: section.rawContent.table.num_of_cols + 1,
        tableSize: defaultTableSize,
      },
    }

    this.update(json)
  }

  closeContextMenu = () => {
    this.setState({
      visibleContext: false,
      interestedRowIndex: null,
    })
  }

  render() {
    const { classes, section, pageAttributes } = this.props
    const { visibleContext, interestedRowIndex } = this.state
    const { rawContent } = section

    if (isNil(rawContent)) {
      const initialTable = this._initTable(3, 3)
      this.update(initialTable)
      return (
        <div className={classes.initText}>
          Initialising <span>Contained Table.</span> Please wait...
        </div>
      )
    }
    const { table } = rawContent

    return (
      <Fragment>
        {visibleContext ? (
          <ContextOptions
            close={() => this.closeContextMenu()}
            contextDimensions={this.state.contextDimensions}>
            <div className="contextMenu--option">Remove Table</div>
            <div onClick={() => this._addRow()} className="contextMenu--option">
              Add Row
            </div>
            {interestedRowIndex !== null && (
              <div className="contextMenu--option">
                remove Row ({interestedRowIndex + 1})
              </div>
            )}

            <div className="contextMenu--option">Pregnant Pockets</div>
            <div className="contextMenu--option">Abort Your wallet</div>
            <div className="contextMenu--option">
              underpaid overwhelming weight
            </div>
            <div className="contextMenu--option">walk the finish line</div>
            <div className="contextMenu--option">cross the finish line</div>
          </ContextOptions>
        ) : null}
        <Resizable
          className={classes.containedTable}
          onResizeStop={(e, direction, ref, d) => {
            this._resizeTable(
              this.state.tableSize.width + d.width,
              this.state.tableSize.height + d.height
            )
          }}
          size={this.state.tableSize}>
          <Table onContextMenu={e => this.handleTableClick(e, 1)}>
            {table.rows.map((row, rIdx) => {
              console.log("Table Rows ", row)
              return (
                <Resizable
                  className={classes.containedRow}
                  onContextMenu={e => this.handleRowClick(e, rIdx)}
                  // defaultSize={{ width: "100%", height: row.rowHeight }}
                  defaultSize={{
                    width: "calc(100% - 20px)",
                    height: row.rowHeight,
                  }}
                  // defaultSize={{ width: "unset", height: row.rowHeight }}
                  onResizeStop={(e, direction, ref, d) => {
                    // this._resizeRow(row.rowHeight + d.height, rIdx)
                    this._resizeRow(
                      row.rowHeight ? row.rowHeight + d.height : 80,
                      rIdx
                    )
                  }}>
                  {row.cells.map((cell, cIdx) => {
                    return (
                      <TableCell className={classes.cell}>
                        <RichEditor
                          pageAttributes={pageAttributes}
                          document={
                            cell.document
                              ? cell
                              : this._generateCell(rIdx, cIdx)
                          }
                          // document={cell}
                          // document={cell.document}
                          // document={this._generateCell(rIdx, cIdx)}
                          updateDocument={document =>
                            this._updateCell(document, rIdx, cIdx)
                          }
                        />
                      </TableCell>
                    )
                  })}
                </Resizable>
              )
            })}
          </Table>
        </Resizable>
      </Fragment>
    )
  }

  _initTable = (numOfRows, numOfCols) => {
    const json = {
      table: {
        rows: this._initRows(numOfRows, numOfCols),
        num_of_cols: numOfCols,
        tableSize: defaultTableSize,
      },
    }
    return json
  }

  _initRows = (numOfRows, numOfCols) => {
    const rows = []
    for (let r = 0; r < numOfRows; r++) {
      let cells = []
      for (let c = 0; c < numOfCols; c++) {
        let newCell = this._generateCell(r, c)
        cells.push(newCell)
      }
      rows.push({ cells: cells, rowHeight: 80 })
    }
    return rows
  }

  _generateCell = (r, c) => {
    const nodes = [
      {
        object: "block",
        type: "paragraph",
        // nodes: [{ object: "text", leaves: [{ text: faker.lorem.paragraph() }] }],
        nodes: [
          {
            object: "text",
            leaves: [{ text: `${r}, ${c}` }],
          },
        ],
      },
    ]
    const json = {
      document: { nodes },
    }
    return json
  }
}

export default compose(
  withApollo,
  withStyles(styles)
)(ContainedTable)
