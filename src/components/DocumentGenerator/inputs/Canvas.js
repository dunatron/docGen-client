import React, { Component, Fragment } from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import faker from "faker"

// Marks
import CodeMark from "../marks/CodeMark"
import HeaderMark from "../marks/HeaderMark"
// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

/**
 * Create a huge JSON document.
 *
 * @type {Object}
 */

const HEADINGS = 1
const PARAGRAPHS = 1 // Paragraphs per heading
const nodes = []
const json = {
  document: { nodes },
}

for (let h = 0; h < HEADINGS; h++) {
  nodes.push({
    object: "block",
    type: "heading",
    // nodes: [{ object: "text", leaves: [{ text: faker.lorem.sentence() }] }],
    nodes: [
      {
        object: "text",
        leaves: [
          { text: "Heading(edit): Simplistic, feature packed editor 🔥" },
        ],
      },
    ],
  })

  for (let p = 0; p < PARAGRAPHS; p++) {
    nodes.push({
      object: "block",
      type: "paragraph",
      // nodes: [{ object: "text", leaves: [{ text: faker.lorem.paragraph() }] }],
      nodes: [
        {
          object: "text",
          leaves: [{ text: "A new paragraph for editing 😎" }],
        },
      ],
    })
  }
}

function renderPlaceholder(props) {
  const { node, editor } = props
  return <span>{editor.props.placeholder}</span>
}

class Canvas extends Component {
  constructor(props) {
    super(props)
    const { document } = this.props

    console.log("THE SERVER DOCUMENT => ", document)
    console.log("The static JSON => ", json)

    this.state = {
      focused: false,
      // document: Value.fromJSON(json, { normalize: false }),
      document: document
        ? Value.fromJSON(document)
        : Value.fromJSON(json, { normalize: false }),
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
      case "heading":
        return <HeaderMark {...props} />
    }
  }

  updateDocument = document => {
    this.props.updateDocument(document)
  }

  onFocus = () => {
    this.setState({
      focused: true,
    })
  }

  onBlur = () => {
    this.setState({
      focused: false,
    })
    this.updateDocument(this.state.document)
  }

  render() {
    const { document, focused } = this.state
    return (
      <Fragment>
        {focused ? "editor is focused" : null}
        <Editor
          onFocus={() => this.onFocus()}
          // onBlur={() => this.updateDocument(document)}
          onBlur={() => this.onBlur()}
          renderPlaceholder={renderPlaceholder}
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
