import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
// RichEditor
import RichEditor from "../inputs/RichEditor"
// Mui Components
import IconButton from "@material-ui/core/IconButton"
// Icons
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"

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
      zIndex: 99999,
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

    // If rawContent is null we have not initialssed our columns yet!
    let columns = []
    if (rawContent) {
      columns = rawContent.columns
    } else {
      columns = this._initializeColumns()
    }

    // Initialise document from it's json

    this.state = {
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

  render() {
    const { columns } = this.state
    const { focused, classes } = this.props
    const columnsLength = columns.length

    return (
      <div className={classes.columnsWrapper}>
        {columns &&
          columns.map((col, colIdx) => {
            console.log("A column ", col)
            return (
              <div
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
