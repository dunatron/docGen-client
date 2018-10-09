import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
// RichEditor
import RichEditor from "../inputs/RichEditor"

// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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

  render() {
    const { columns } = this.state
    const columnsLength = columns.length

    return (
      <div style={{ display: "flex" }}>
        {columns &&
          columns.map((col, colIdx) => {
            console.log("A column ", col)
            return (
              <div
                style={{
                  // flexGrow: 1,
                  // flexShrink: 1,
                  // flexBasis: "50%",
                  flexBasis: `${100 / columnsLength}%`,
                  border: "2px solid black",
                }}>
                <RichEditor
                  document={col ? col : this._generateInitial()}
                  // document={this._generateInitial()}
                  // updateDocument={doc => this.update(doc)}
                  updateDocument={doc => {
                    console.log("ToDo: Update section", doc)
                    this.updateColumn(doc, colIdx)
                  }}
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
