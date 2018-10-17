import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
import { Table, TableRow, TableCell } from "@material-ui/core"
// RichEditor
import RichEditor from "../inputs/RichEditor"
// Utils
import { isEmpty, isNil, path, pathEq, filter } from "ramda"
import DOCUMENT_QUERY from "../../../queries/Document.graphql"

const styles = theme => ({})

class RichTable extends Component {
  update = table => {
    const { classes, section } = this.props
    const { id, type, rawContent } = section
    const updatedSection = { id, type, rawContent: table }
    this.props.update(updatedSection)
  }

  // Update section for document. use Fragments for a section
  // Then use Ramda to update a Section Fragment cell
  _updateCell = (document, rIdx, cIdx) => {
    console.group("_updateCell")
    console.log("rIdx => ", rIdx)
    console.log("cIdx => ", cIdx)
    console.log("document => ", document)
    console.groupEnd()

    console.log("Our props ", this.props)
    // this.props.client.
    // readQuery({
    //   query: SINGLE_DOCUMENT_QUERY,
    //   variables: { id: documentId },
    // })
    const {
      client,
      section,
      // section: { id, type, rawContent, position },
    } = this.props

    // const doc = client.store.readQuery({
    //   query: DOCUMENT_QUERY,
    //   variables: { id: "cjn0wjnfywasy0b48vax4sufx" },
    // })

    // let doc = client.readQuery({
    //   query: DOCUMENT_QUERY,
    //   variables: { id: "cjn2c5g901lla0a90yty5vbvt" },
    // })

    // console.log("Cached Doc ", doc)

    // console.log("Reading what we have in our store ", doc)
    // // pathEq
    // const editorToUpdate = path(
    //   [position, "rawContent", "table", "rows", rIdx, cIdx],
    //   doc.singleDocument.sections
    // )
    // // const editedCell = document.Value.document
    // console.log("editorToUpdate => ", editorToUpdate)
    // console.log("document to replace with => ", document)
    // // console.log("editedCell => ", editedCell)

    // // Umm no need to read the query tbh. we have access to the section and that is all we are updating...
    // const sectionSlice = doc.singleDocument.sections[position]

    // doc.singleDocument.sections[position].rawContent.table.rows[rIdx][cIdx] =
    //   document.document
    // sectionSlice.rawContent.table.rows[rIdx][cIdx] = document.document

    console.log("Section Before => ", section)
    const updatedTableSection = section.rawContent.table
    updatedTableSection.rows[rIdx][cIdx] = { document }
    // updatedTableSection.rows[rIdx][cIdx] = document
    console.log("Section After => ", updatedTableSection)

    const json = {
      table: {
        ...updatedTableSection,
      },
    }

    return this.update(json)

    // doc.singleDocument.sections[position] = document

    //this.update(updatedTableSection)

    // Remember to convert sections to GrapgQl Fragments
    //https://www.apollographql.com/docs/react/advanced/fragments.html
  }

  renderTable = table => {
    const { classes, pageAttributes } = this.props
    console.log("Our Table to render => ", table)
    return (
      <Table>
        {table.rows.map((row, rIdx) => {
          return (
            <TableRow>
              {row.map((cell, cIdx) => {
                return (
                  <TableCell>
                    <RichEditor
                      pageAttributes={pageAttributes}
                      // document={
                      //   cell.document
                      //     ? cell.document
                      //     : this._generateCell(rIdx, cIdx)
                      // }
                      document={cell.document}
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
    )
  }

  render() {
    const { classes, section, pageAttributes } = this.props
    const { id, type, rawContent } = section

    // Note: use the below to reset the db shitness
    const initialTable = this._initTable(3, 3)
    this.update(initialTable)

    if (isNil(rawContent)) {
      const initialTable = this._initTable(3, 3)
      this.update(initialTable)
      console.log("Initial Table => ", initialTable)
      return <div>Setting up Your new Rich Table. Please wait...</div>
    }
    const { table } = rawContent

    return (
      <Fragment>
        {/* {this.renderTable(table)} */}
        <Table>
          {table.rows.map((row, rIdx) => {
            return (
              <TableRow>
                {row.map((cell, cIdx) => {
                  console.log("Table cell => ", cell)
                  return (
                    <TableCell>
                      <RichEditor
                        pageAttributes={pageAttributes}
                        document={
                          cell.document
                            ? cell.document
                            : this._generateCell(rIdx, cIdx)
                        }
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

// export default withStyles(styles)(RichTable)

export default compose(
  withApollo,
  withStyles(styles)
)(RichTable)
