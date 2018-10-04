import React, { Component, Fragment } from "react"
import { Editor } from "slate-react"
import { Value } from "slate"

// Marks
import CodeMark from "../marks/CodeMark"
// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "A line of text in a paragraph.",
              },
            ],
          },
        ],
      },
    ],
  },
})

class Canvas extends Component {
  constructor(props) {
    super(props)
    const { document } = this.props

    this.state = {
      // document: document ? Value.fromJSON(document) : initialValue,
      document: initialValue,
    }
  }
  editorChange = ({ value }) => {
    this.setState({ document: value })
  }

  // Define a new handler which prints the key that was pressed.
  onKeyDown = (event, change) => {
    console.log(event.key)
    // return with no changes if the keypress is not '&'&
    // if (event.key !== "t") return

    // Prevent the ampersand character being inserted
    // event.preventDefault()

    // // Change the value by inserting 'and' at the cursor's position.
    // change.insertText("Tron")
    if (event.key !== "`" || !event.ctrlKey) return

    // Prevent the "`" from being inserted by default.
    event.preventDefault()

    // Determine whether any of the currently selected blocks are code blocks.
    const isCode = change.value.blocks.some(block => block.type == "code")

    // Toggle the block type depending on `isCode`.
    change.setBlocks(isCode ? "paragraph" : "code")
    return true
  }

  renderNode = props => {
    switch (props.node.type) {
      case "code":
        return <CodeMark {...props} />
    }
  }
  render() {
    const { document } = this.state
    return (
      <Fragment>
        <Editor
          data-section-attr={this.props.sIdx}
          value={document}
          onChange={this.editorChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
        />
      </Fragment>
    )
  }
}

export default Canvas
