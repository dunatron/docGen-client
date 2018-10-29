import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
import { Table, TableRow, TableCell } from "@material-ui/core"
// Resize
import Resizable from "re-resizable"
// RichEditor
import RichEditor from "../inputs/RichEditor"
import ContextOptions from "../ContextOptions"
import ContextMenuGenerator from "../ContextMenuGenerator"
// import ColorSettings from "../ColorSettings"
import ColorPicker from "../../ColorPicker/index"
// Utils
import { isEmpty, isNil } from "ramda"

const styles = theme => ({
  initText: {
    ...theme.typography.subheading, // subheading
    color: theme.palette.secondary.main,
    padding: theme.spacing.unit * 4,
    font: theme.typography.display4,
    display: "block",
    textAlign: "center",
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
class RichTable extends Component {
  constructor(props) {
    super(props)
    const { classes, section, pageAttributes } = this.props
    const { rawContent } = section

    const initState = {
      visibleContext: false,
      contextDimensions: {
        x: null,
        y: null,
      },
      interestedRowIndex: null,
      interestedCellIndex: null,
    }

    if (isNil(rawContent)) {
      const initialTable = this._initTable(3, 3)
      this.update(initialTable)
      this.state = {
        ...initState,
        tableSize: defaultTableSize,
      }
    } else {
      const { table } = rawContent
      console.log("Peek at the table => ", table)
      this.state = {
        ...initState,
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

  handleCellClick = (e, rIdx, cIdx) => {
    if (e.nativeEvent.which === 1) {
      // do nothing, it should always hit below anyway?
    } else if (e.nativeEvent.which === 3) {
      this.handleCellContext(e, rIdx, cIdx)
    }
  }

  getCellAttributes = (rIdx, cIdx) => {
    const { section } = this.props

    const cellAttributes = section.rawContent.table
    cellAttributes.rows[rIdx].cells[cIdx].attributes
    return cellAttributes
  }

  handleCellContext = (e, rIdx, cIdx) => {
    e.preventDefault()
    this.setState({
      visibleContext: true,
      interestedRowIndex: rIdx,
      interestedCellIndex: cIdx,
      currCellAttributes: this.getCellAttributes(rIdx, cIdx),

      contextDimensions: {
        x: e.clientX,
        y: e.clientY,
      },
    })
    console.log("THE STATE => ", this.state)
  }

  colorCell = color => {
    const { interestedRowIndex, interestedCellIndex } = this.state
    // alert("Color the cell " + interestedCellIndex + " with " + color)
    const { section } = this.props

    const updatedTableSection = section.rawContent.table
    updatedTableSection.rows[interestedRowIndex].cells[
      interestedCellIndex
    ].attributes = { color: color }

    // change the state of it each time sure.
    // just dont do a network request.
    // a better way is to go into the picker itself and determine when it is no longer being changed!
    // we now have a onChangeComplete
    // However when we leave the cell it updates again just simply due to leaving the cell
    // return

    const json = {
      table: {
        ...updatedTableSection,
      },
    }

    return this.update(json)
  }

  renderRowContext = () => {
    const rowContextConf = {
      items: [
        {
          title: "Delete Table",
          action: () => this.props.delete(),
        },
        {
          title: "item 1",
          action: () => alert("HIiiiii"),
          items: [
            {
              title: "Sibling Item 1",
              action: () => alert("sibling action 1"),
            },
          ],
        },
        {
          title: "item 2",
          component: (
            <ColorPicker
              label={"Cell color"}
              setColor={color => this.colorCell(color)}
              // onChange={color => this.colorCell(color)}
            />
          ),
        },
      ],
    }

    return <ContextMenuGenerator conf={rowContextConf} />

    return (
      <Fragment>
        <div>
          cell color:{" "}
          {/* <ColorSettings
                currColor={this.state.currCellAttributes.color}
                changeColor={c => this.colorCell(c)}
              /> */}
          <ColorPicker
            label={"Cell color"}
            setColor={color => this.colorCell(color)}
            // onChange={color => this.colorCell(color)}
          />
        </div>
      </Fragment>
    )
  }

  render() {
    const { classes, section, pageAttributes } = this.props
    const { rawContent } = section
    const { visibleContext } = this.state

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
            close={() =>
              this.setState({
                visibleContext: false,
              })
            }
            contextDimensions={this.state.contextDimensions}>
            {this.renderRowContext()}
            <div
              onClick={() => this.props.delete()}
              className="contextMenu--option">
              Remove Table
            </div>
            <div
              onClick={() => this.colorCell()}
              className="contextMenu--option">
              Color Cell{" "}
            </div>
            <div>
              cell color:{" "}
              {/* <ColorSettings
                currColor={this.state.currCellAttributes.color}
                changeColor={c => this.colorCell(c)}
              /> */}
              <ColorPicker
                label={"Cell color"}
                setColor={color => this.colorCell(color)}
                // onChange={color => this.colorCell(color)}
              />
            </div>
          </ContextOptions>
        ) : null}
        <Table>
          {table.rows.map((row, rIdx) => {
            console.log("Table Rows ", row)
            return (
              <TableRow>
                {row.cells.map((cell, cIdx) => {
                  return (
                    <TableCell
                      style={{ ...cell.attributes }}
                      onContextMenu={e => this.handleCellClick(e, rIdx, cIdx)}>
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
      attributes: { color: "blue" },
    }
    return json
  }
}

export default compose(
  withApollo,
  withStyles(styles)
)(RichTable)
