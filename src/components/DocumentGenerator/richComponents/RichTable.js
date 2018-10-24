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

const styles = theme => ({})

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
class RichTable extends Component {
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
        tableSize: {
          width: table.tableSize.width,
          height: table.tableSize.height,
          // width: 550,
          // height: 300,
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
    updatedTableSection.rows[rIdx][cIdx] = document

    const json = {
      table: {
        ...updatedTableSection,
      },
    }

    return this.update(json)
  }

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

  render() {
    const { classes, section, pageAttributes } = this.props
    const { rawContent } = section

    if (isNil(rawContent)) {
      const initialTable = this._initTable(3, 3)
      this.update(initialTable)
      return <div>Setting up Your new Rich Table. Please wait...</div>
    }
    const { table } = rawContent

    return (
      <Fragment>
        {/* <Resizable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
          }}
          defaultSize={{
            width: 200,
            height: 200,
          }}>
          001
        </Resizable> */}
        <Resizable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
          }}
          onResizeStop={(e, direction, ref, d) => {
            this._resizeTable(
              this.state.tableSize.width + d.width,
              this.state.tableSize.height + d.height
            )
          }}
          size={this.state.tableSize}>
          <Table>
            {table.rows.map((row, rIdx) => {
              return (
                <Resizable
                  style={{
                    border: "solid 1px #ddd",
                  }}
                  defaultSize={{ width: 150, height: row.rowHeight }}
                  onResizeStop={(e, direction, ref, d) => {
                    // this._resizeRow(row.rowHeight + d.height, rIdx)
                    this._resizeRow(
                      row.rowHeight ? row.rowHeight + d.height : 80,
                      rIdx
                    )
                    // this._resizeTable(
                    //   this.state.tableSize.width + d.width,
                    //   this.state.tableSize.height + d.height
                    // )
                    // Resize the row

                    alert("ToDo: resize row smartly")
                  }}>
                  I am resizable row ToDo: think carefully about this
                </Resizable>
                // <TableRow>
                //   {row.map((cell, cIdx) => {
                //     return (
                //       <TableCell>
                //         <RichEditor
                //           pageAttributes={pageAttributes}
                //           document={
                //             cell.document
                //               ? cell
                //               : this._generateCell(rIdx, cIdx)
                //           }
                //           // document={cell}
                //           // document={cell.document}
                //           // document={this._generateCell(rIdx, cIdx)}
                //           updateDocument={document =>
                //             this._updateCell(document, rIdx, cIdx)
                //           }
                //         />
                //       </TableCell>
                //     )
                //   })}
                // </TableRow>
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
      // rows.push(cells)
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
)(RichTable)
