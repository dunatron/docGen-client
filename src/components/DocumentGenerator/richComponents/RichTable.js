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
// Inputs
import NumberInput from "../../inputs/NumberInput"
import NumberDelayInput from "../../inputs/NumberDelayInput"
// Utils
import uuidV4 from "uuidv4"
import { isEmpty, isNil } from "ramda"
import { extractNumber } from "../../../utils/extractNumber"
import { extractFirstNum } from "../../../utils/extractValues"

// Test to see if portal is the correct solution
// Ther idea here is that we pull it out of te dom meaning having it placed absolutly will be easier
import ContextMenu from "../ContextMenu/index"
// ICONS for context menu
import ListItemIcon from "@material-ui/core/ListItemIcon"
import BorderAllIcon from "@material-ui/icons/BorderAll"
import BorderColorIcon from "@material-ui/icons/BorderColor"
import FormatColorTxtIcon from "@material-ui/icons/FormatColorText"
import { RoomTwoTone } from "@material-ui/icons"

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

  getTableAttributes = () => {
    return this.props.section.rawContent.table.attributes
  }

  getRowAttributes = rIdx => {
    return this.props.section.rawContent.table.rows[rIdx].attributes
  }

  getCellAttributes = (rIdx, cIdx) => {
    return this.props.section.rawContent.table.rows[rIdx].cells[cIdx].attributes
  }

  handleCellContext = async (e, rIdx, cIdx) => {
    e.preventDefault()
    await this.setState({
      visibleContext: true,
      interestedRowIndex: rIdx,
      interestedCellIndex: cIdx,
      currTableAttributes: this.getTableAttributes(),
      currRowAttributes: this.getRowAttributes(rIdx, cIdx),
      currCellAttributes: this.getCellAttributes(rIdx, cIdx),

      contextDimensions: {
        x: e.clientX,
        y: e.clientY,
      },
    })
    console.log("THE STATE => ", this.state)
  }

  setTableAttribute = (attr, val) => {
    const { section } = this.props

    const table = section.rawContent.table
    table.attributes = {
      ...table.attributes,
      [attr]: val,
    }
    const json = {
      table: {
        ...table,
      },
    }

    return this.update(json)
  }

  setRowAttribute = (attr, val) => {
    const { interestedRowIndex } = this.state
    const { section } = this.props

    const table = section.rawContent.table
    table.rows[interestedRowIndex].attributes = {
      ...table.rows[interestedRowIndex].attributes,
      [attr]: val,
    }
    const json = {
      table: {
        ...table,
      },
    }

    return this.update(json)
  }

  setCellAttribute = (attr, val) => {
    const { interestedRowIndex, interestedCellIndex } = this.state
    const { section } = this.props

    const updatedTableSection = section.rawContent.table
    updatedTableSection.rows[interestedRowIndex].cells[
      interestedCellIndex
    ].attributes = {
      ...updatedTableSection.rows[interestedRowIndex].cells[interestedCellIndex]
        .attributes,
      [attr]: val,
    }
    const json = {
      table: {
        ...updatedTableSection,
      },
    }

    return this.update(json)
  }

  renderTableContext = () => {
    const { interestedRowIndex, interestedCellIndex } = this.state
    const rowContextConf = {
      items: [
        {
          title: "Delete Table",
          action: () => this.props.delete(),
        },
        {
          title: "Add Row",
          action: () => this._addRow(),
        },
        {
          title: "Delete Row",
          action: () => this._deleteRow(),
        },
        {
          title: "Table Attributes",
          action: () => alert("ToDo: turn into subsection"),
          items: [
            {
              title: "Set Margin Top",

              component: (
                <NumberDelayInput
                  id="set-table-margin-top"
                  label="table margin top"
                  waitLength={1500}
                  defaultValue={extractFirstNum(
                    this.state.currTableAttributes["margin-top"]
                  )}
                  handleChange={v =>
                    this.setTableAttribute("margin-top", `${v}px`)
                  }
                />
              ),
              // component: (
              //   <NumberInput
              //     id="set-table-margin-top"
              //     label="table margin top"
              //     defaultValue={extractFirstNum(
              //       this.state.currTableAttributes["margin-top"]
              //     )}
              //     handleChange={v =>
              //       this.setTableAttribute("margin-top", `${v}px`)
              //     }
              //   />
              // ),
            },
          ],
        },
        {
          title: "Row Attributes",
          action: () => alert("HIiiiii"),
          items: [
            {
              title: "Sibling Item 1",
              action: () => alert("sibling action 1"),
            },
            {
              title: "Row border thickness 2px solid",
              icon: <BorderAllIcon />,
              action: () => this.setRowAttribute("border", "2px solid"),
            },
            {
              title: "Set Row Border Color",
              component: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BorderColorIcon style={{ padding: "0 16px" }} />
                  <ColorPicker
                    defaultValue={
                      this.state.currRowAttributes
                        ? this.state.currRowAttributes["border-color"]
                        : "#000"
                    }
                    label={"setRowBorder"}
                    setColor={color =>
                      this.setRowAttribute("border-color", color)
                    }
                  />
                </div>
              ),
            },
          ],
        },
        {
          title: "Cell Attributes",
          action: () => alert("ToDo: submenu click pattern"),
          items: [
            {
              title: "Set Cell Color",
              component: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FormatColorTxtIcon style={{ padding: "0 16px" }} />
                  <ColorPicker
                    defaultValue={
                      this.state.currCellAttributes
                        ? this.state.currCellAttributes["color"]
                        : "#000"
                    }
                    label={"Set cell color"}
                    setColor={color => this.setCellAttribute("color", color)}
                  />
                </div>
              ),
            },
            {
              title: "Set Cell Padding",
              component: (
                <NumberDelayInput
                  waitLength={1500}
                  id="set-cell-padding"
                  label="cell padding"
                  defaultValue={extractFirstNum(
                    this.state.currCellAttributes["padding"]
                  )}
                  handleChange={v => this.setCellAttribute("padding", `${v}px`)}
                />
              ),
            },
            {
              title: "Set Cell Margin",
              component: (
                <NumberDelayInput
                  waitLength={1500}
                  id="set-cell-margin"
                  label="cell margin"
                  defaultValue={extractFirstNum(
                    this.state.currCellAttributes["margin"]
                  )}
                  handleChange={v => this.setCellAttribute("margin", `${v}px`)}
                />
              ),
            },
            // Cell Border children
            {
              title: "cell border attributes",
              items: [
                {
                  title: "Border Top",
                  action: () => alert("set cell border top"),
                  component: (
                    <NumberInput
                      id="set-cell-border-top"
                      label="cell border top"
                      defaultValue={extractFirstNum(
                        this.state.currCellAttributes["border-top"]
                      )}
                      handleChange={v =>
                        this.setCellAttribute("border-top", `${v}px solid`)
                      }
                    />
                  ),
                  //NumberInput
                },
                {
                  title: "Border Right",
                  action: () => alert("set cell border top"),
                  component: (
                    <NumberInput
                      id="set-cell-border-right"
                      label="cell border right"
                      defaultValue={extractFirstNum(
                        this.state.currCellAttributes["border-right"]
                      )}
                      handleChange={v =>
                        this.setCellAttribute("border-right", `${v}px solid`)
                      }
                    />
                  ),
                  //NumberInput
                },
                {
                  title: "Border Bottom",
                  action: () => alert("set cell border bottom"),
                  component: (
                    <NumberInput
                      id="set-cell-border-bottom"
                      label="cell border bottom"
                      defaultValue={extractFirstNum(
                        this.state.currCellAttributes["border-bottom"]
                      )}
                      handleChange={v =>
                        this.setCellAttribute("border-bottom", `${v}px solid`)
                      }
                    />
                  ),
                  //NumberInput
                },
                {
                  title: "Border Left",
                  action: () => alert("set cell border left"),
                  component: (
                    <NumberInput
                      id="set-cell-border-left"
                      label="cell border left"
                      defaultValue={extractFirstNum(
                        this.state.currCellAttributes["border-left"]
                      )}
                      handleChange={v =>
                        this.setCellAttribute("border-left", `${v}px solid`)
                      }
                    />
                  ),
                  //NumberInput
                },
              ],
            },
            {
              title: "Cell border thickness 2px solid",
              icon: <BorderAllIcon />,
              action: () => this.setCellAttribute("border", "2px solid"),
            },
            {
              title: "Color Cell Border",
              component: (
                <ColorPicker
                  icon={<BorderColorIcon style={{ padding: "0 16px" }} />}
                  defaultValue={
                    this.state.currCellAttributes
                      ? this.state.currCellAttributes["border-color"]
                      : "#000"
                  }
                  label={"cell border color"}
                  setColor={color =>
                    this.setCellAttribute("border-color", color)
                  }
                />
              ),
            },

            {
              title: "Remove Cell Border",
              action: () => this.setCellAttribute("border", "none"),
            },
          ],
        },
      ],
    }
    // return <ContextMenuGenerator conf={rowContextConf} />
    return (
      <ContextMenu
        name={`row${interestedRowIndex}, cell${interestedCellIndex}`}
        conf={rowContextConf}
      />
    )
  }

  renderCells = (rIdx, cells) => {
    const { pageAttributes } = this.props
    return cells.map((cell, cIdx) => {
      return (
        <TableCell
          key={cell.id}
          style={{ ...cell.attributes }}
          onContextMenu={e => this.handleCellClick(e, rIdx, cIdx)}>
          <RichEditor
            pageAttributes={pageAttributes}
            document={cell.document ? cell : this._generateCell(rIdx, cIdx)}
            updateDocument={document => this._updateCell(document, rIdx, cIdx)}
          />
        </TableCell>
      )
    })
  }

  renderRows = rows => {
    console.log("The rows To render => ", rows)
    return rows.map((row, rIdx) => {
      console.log("Table Rows ", row)
      return (
        <TableRow key={row.id} style={{ ...row.attributes }}>
          {this.renderCells(rIdx, row.cells)}
          {/* {row.cells.map((cell, cIdx) => {
            return (
              <TableCell
                style={{ ...cell.attributes }}
                onContextMenu={e => this.handleCellClick(e, rIdx, cIdx)}>
                <RichEditor
                  pageAttributes={pageAttributes}
                  document={
                    cell.document ? cell : this._generateCell(rIdx, cIdx)
                  }
                  updateDocument={document =>
                    this._updateCell(document, rIdx, cIdx)
                  }
                />
              </TableCell>
            )
          })} */}
        </TableRow>
      )
    })
  }

  render() {
    const { classes, section, pageAttributes } = this.props
    console.log(
      "Have a look at the structure which is being passed through! it needs fixed => ",
      section
    )
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
    const { rows } = table

    console.log("The table Being Rendered => ", table)
    console.log("The table rows => ", rows)

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
            {this.renderTableContext()}
          </ContextOptions>
        ) : null}
        <Table style={{ ...table.attributes }}>
          <tbody>{this.renderRows(table.rows)}</tbody>

          {/* {table.rows.map((row, rIdx) => {
            console.log("Table Rows ", row)
            return (
              <TableRow style={{ ...row.attributes }}>
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
                        updateDocument={document =>
                          this._updateCell(document, rIdx, cIdx)
                        }
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })} */}
          {/* {table.rows.map((row, rIdx) => {
            console.log("Table Rows ", row)
            return (
              <TableRow style={{ ...row.attributes }}>
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
                        updateDocument={document =>
                          this._updateCell(document, rIdx, cIdx)
                        }
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })} */}
        </Table>
      </Fragment>
    )
  }

  _initTable = (numOfRows, numOfCols) => {
    const json = {
      table: {
        rows: this._initRows(numOfRows, numOfCols),
        num_of_cols: numOfCols,
        attributes: {},
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
      rows.push({
        id: uuidV4(),
        // attributes: { backgroundColor: "rgba(0,72,81, 0.4)" },
        attributes: {
          backgroundColor: r % 2 ? "rgba(0,72,81, 0.4)" : "rgba(0,72,81, 0.2)",
        },
        cells: cells,
        rowHeight: 80,
      })
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
      id: uuidV4(),
      document: { nodes },
      attributes: { color: "blue" },
    }
    return json
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
        // num_of_cols: section.rawContent.table.num_of_cols + 1, // correct for colums
        num_of_cols: section.rawContent.table.num_of_cols,
      },
    }

    this.update(json)
  }

  _deleteRow = () => {
    const { interestedRowIndex } = this.state
    let { section } = this.props
    // alert("Delete row sss" + interestedRowIndex)
    // section.rawContent.table.rows.splice(interestedRowIndex, 1) // splice out interested Row
    // const updatedRows = section.rawContent.table.rows.splice(
    //   interestedRowIndex,
    //   1
    // )
    const updatedRows = section.rawContent.table.rows.filter(
      (r, rIdx) => rIdx !== interestedRowIndex
    )

    console.log("The filtered Rows! ", updatedRows)

    const json = {
      table: {
        ...section.rawContent.table,
        rows: updatedRows,
      },
    }

    this.update(json)
  }

  // _addRow = () => {
  //   const { interestedRowIndex } = this.state
  //   const { section } = this.props

  //   console.log("Take a peek at the section ", section)
  //   const table = section.rawContent.table
  //   const newRow = this._initRows(1, table.num_of_cols)
  //   console.log("tbale before update table => ", table)
  //   console.log("newRow => ", newRow)
  //   // table.rows.concat(newRow)

  //   table.num_of_cols = table.num_of_cols + 1
  //   table.rows.push(newRow)
  //   console.log("The updated table => ", table)
  //   // const json = {
  //   //   table: {
  //   //     ...table,
  //   //   },
  //   // }

  //   // return this.update(json)
  // }
}

export default compose(
  withApollo,
  withStyles(styles)
)(RichTable)
