import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
import { Table, TableRow, TableCell } from "@material-ui/core"
// RichEditor
import RichEditor from "../inputs/RichEditor"
// Utils
import { isEmpty, isNil } from "ramda"

const styles = theme => ({})

// Resizable Table outer!
// Reuse this
// Resize div => https://github.com/STRML/react-resizable

class RichTable extends Component {
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

  render() {
    const { classes, section, pageAttributes } = this.props
    const { rawContent } = section

    if (isNil(rawContent)) {
      const initialTable = this._initTable(3, 3)
      this.update(initialTable)
      console.log("Initial Table => ", initialTable)
      return <div>Setting up Your new Rich Table. Please wait...</div>
    }
    const { table } = rawContent

    return (
      <Fragment>
        <Table>
          {table.rows.map((row, rIdx) => {
            console.log("row => ", row)
            return (
              <TableRow>
                {row.map((cell, cIdx) => {
                  console.log("cell => ", cell)
                  return (
                    <TableCell>
                      <RichEditor
                        pageAttributes={pageAttributes}
                        document={
                          cell.document ? cell : this._generateCell(rIdx, cIdx)
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
              </TableRow>
            )
          })}
        </Table>
      </Fragment>
    )
  }

  _initTable = (numOfRows, numOfCols) => {
    const json = {
      table: {
        rows: this._initRows(numOfRows, numOfCols),
        num_of_cols: numOfCols,
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
      rows.push(cells)
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
