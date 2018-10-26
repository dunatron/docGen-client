import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
// RichEditor
import RichEditor from "../inputs/RichEditor"
// ContextMenu
import ContextMenu from "../ContextMenu"
// Mui Components
import IconButton from "@material-ui/core/IconButton"
// Icons
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import position from "../../../suggestions/caret-position"
import { isUndefined } from "../../../utils/checkType"

import ContextOptions from "../ContextOptions"

// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  toolBar: {
    padding: theme.spacing.unit,
    position: "absolute",
    display: "flex",
    boxSizing: "border-box",
    alignItems: "center",
    top: "-62px", // the 2px border
    height: "60px",
    width: "100%",
    left: 0,
    backgroundColor: "#FFF",
    opacity: 0, // I'm a beast
    "&:hover": {
      opacity: "1",
      width: "fit-content",
      border: "2px solid black",
      zIndex: 1000,
    },
    "&:hover:before": {
      opacity: "1",
      width: "100%",
      border: "5px solid red",
      zIndex: 99999,
    },
    "&:hover:after": {
      opacity: "1",
      width: "200px",
      border: "5px solid green",
      zIndex: 99999,
    },
    "&:after": {
      width: "100%",
    },
  },
  contextMenu: {
    position: "fixed",
    zIndex: 10000,
    backgroundColor: "#FFF",
  },
  columnsWrapper: {
    display: "flex",
    // flexWrap: "wrap", // This causes issues with just 2...
  },
  column: {
    position: "relative",
    border: "2px solid black",
  },
})

class RichColumns extends Component {
  constructor(props) {
    super(props)
    const { classes, section } = this.props
    const { id, type, rawContent } = section
    this.root = React.createRef()

    // If rawContent is null we have not initialssed our columns yet!
    let columns = []
    if (rawContent) {
      columns = rawContent.columns
    } else {
      columns = this._initializeColumns()
    }

    // Initialise document from it's json

    this.state = {
      visibleContext: false,
      contextDimensions: {
        x: null,
        y: null,
      },
      interestedColIndex: null,
      focused: false,
      id,
      type,
      rawContent,
      columns,
    }
  }
  update = document => {
    const { classes, section } = this.props
    const { id, type, rawContent } = section
    const updatedSection = { id, type, rawContent: { document } }
    this.props.update(updatedSection)
  }
  updateColumn = (doc, colIdx) => {
    const { id, type, columns } = this.state
    columns[colIdx] = doc
    this.setState({
      columns: columns,
    })

    const updatedSection = {
      id,
      type,
      rawContent: {
        columns: columns,
      },
    }
    this.props.update(updatedSection)
  }

  // colIdx will be used as well as an alert prompt, to the left or to the right to add.
  _addColumn = colIdx => {
    const columns = this.state.columns
    const newColumn = this._generateInitial()
    const newColumns = columns.concat(newColumn)
    this.setState({
      columns: newColumns,
    })
  }

  _addColumnToSide = side => {
    switch (side) {
      case "right": {
        const columns = this.state.columns
        const newColumn = this._generateInitial()
        const newColumns = columns.concat(newColumn)
        this.setState({
          columns: newColumns,
        })
      }
      default: {
        return
      }
    }
  }

  renderToolBar = colIdx => {
    const { classes } = this.props
    return (
      <div className={classes.toolBar}>
        <IconButton
          mini
          onClick={() => this._removeColumn(colIdx)}
          className={classes.button}
          aria-label="Delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton
          mini
          onClick={() => this._addColumn(colIdx)}
          className={classes.button}
          aria-label="Create">
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
    )
  }

  handleColumnContext = (event, colIdx) => {
    console.log("The coumn Index clicked is... ", colIdx)
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
    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const rootW = this.root.offsetWidth
    const rootH = this.root.offsetHeight

    const right = screenW - clickX > rootW
    const left = !right
    const top = screenH - clickY > rootH
    const bottom = !top

    try {
      if (this.root.current !== null) {
        if (right) {
          this.root.style.left = `${clickX + 5}px`
        }

        if (left) {
          this.root.style.left = `${clickX - rootW - 5}px`
        }
        isUndefined

        if (top) {
          this.root.style.top = `${clickY + 5}px`
        }

        if (bottom) {
          this.root.style.top = `${clickY - rootH - 5}px`
        }
      }
    } catch (e) {
      console.log(e)
    }

    // if (right) {
    //   this.root.style.left = `${clickX + 5}px`
    // }

    // if (left) {
    //   this.root.style.left = `${clickX - rootW - 5}px`
    // }

    // if (top) {
    //   this.root.style.top = `${clickY + 5}px`
    // }

    // if (bottom) {
    //   this.root.style.top = `${clickY - rootH - 5}px`
    // }
  }

  handleColumnClick = (e, colIdx) => {
    if (e.nativeEvent.which === 1) {
      // do nothing, it should always hit below anyway?
    } else if (e.nativeEvent.which === 3) {
      this.handleColumnContext(e, colIdx)
    }
  }

  render() {
    const { columns, visibleContext } = this.state
    const { focused, classes } = this.props
    const columnsLength = columns.length

    return (
      <div className={classes.columnsWrapper}>
        {/* Render context Menu on Right click anywhere on the columns component */}

        {/* {visibleContext ? (
          <ContextMenu
            ref={ref => {
              this.root = ref
            }}>
            [<div>Some chils</div>,<div>Another</div>]
          </ContextMenu>
        ) : null} */}
        {/* {visibleContext ? (
          <div
            ref={ref => {
              this.root = ref
            }}
            className={classes.contextMenu}>
            <div
              className="contextMenu--option"
              onClick={() => {
                alert("Checl console for ref")
                console.log("The user ref => ", this.root)
                this._addColumnToSide("right")
              }}>
              Add Column To the right
            </div>
            <div className="contextMenu--option">Add Column to the left</div>
            <div className="contextMenu--option">Delete COlumns</div>
            <div className="contextMenu--option contextMenu--option__disabled">
              HELP
            </div>
          </div>
        ) : null} */}
        {visibleContext ? (
          <ContextOptions
            close={() =>
              this.setState({
                visibleContext: false,
              })
            }
            contextDimensions={this.state.contextDimensions}>
            <div
              className="contextMenu--option"
              onClick={() => {
                alert("Checl console for ref")
                console.log("The user ref => ", this.root)
                this._addColumnToSide("right")
              }}>
              Add Column To the right
            </div>
            <div className="contextMenu--option">Add Column to the left</div>{" "}
          </ContextOptions>
        ) : null}
        {/*  map over and render Columns */}
        {columns &&
          columns.map((col, colIdx) => {
            return (
              <div
                onClick={e => this.handleColumnClick(e, colIdx)}
                onContextMenu={e => this.handleColumnClick(e, colIdx)}
                className={classes.column}
                style={{
                  flexBasis: `${100 / columnsLength}%`,
                }}>
                {focused ? this.renderToolBar(colIdx) : null}
                <RichEditor
                  document={col ? col : this._generateInitial()}
                  updateDocument={doc => this.updateColumn(doc, colIdx)}
                />
              </div>
            )
          })}
      </div>
    )
  }

  _initializeColumns = () => {
    const col1 = this._generateInitial()
    const col2 = this._generateInitial()
    return [col1, col2]
  }

  _generateInitial = () => {
    const nodes = [
      {
        object: "block",
        type: "paragraph",
        // nodes: [{ object: "text", leaves: [{ text: faker.lorem.paragraph() }] }],
        nodes: [
          {
            object: "text",
            leaves: [{ text: "A new paragraph for editing 😎" }],
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

export default withStyles(styles)(RichColumns)
