import React, { Component, Fragment } from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import faker from "faker"
// Serializer
import Html from "slate-html-serializer"

// Marks
import CodeMark from "../render_nodes/CodeMark"
import HeaderMark from "../render_nodes/HeaderMark"
import BoldMark from "../render_marks/BoldMark"
import ItalicMark from "../render_marks/ItalicMark"
// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
// Important: This idea below will allow us to add classes and attributes to our objects as html
// https://docs.slatejs.org/walkthroughs/saving-and-loading-html-content

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules })

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

// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "quote",
  pre: "code",
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
}
const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            className: el.getAttribute("class"),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>
          case "quote":
            return <blockquote>{children}</blockquote>
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>
          case "italic":
            return <em>{children}</em>
          case "underline":
            return <u>{children}</u>
        }
      }
    },
  },
]

function MarkHotkey(options) {
  const { type, key } = options
  return {
    onKeyDown(event, change) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key != key) return
      // Prevent the default characters from being inserted.
      event.preventDefault()
      // Toggle the mark `type`.
      change.toggleMark(type)
      return true
    },
  }
}

// Initialize our bold-mark-adding plugin.
const boldPlugin = MarkHotkey({
  type: "bold",
  key: "b",
})
// Create an array of plugins.
const plugins = [
  // MarkHotkey({ key: "b", type: "bold" }),
  boldPlugin,
  MarkHotkey({ key: "`", type: "code" }),
  MarkHotkey({ key: "i", type: "italic" }),
  MarkHotkey({ key: "~", type: "strikethrough" }),
  MarkHotkey({ key: "u", type: "underline" }),
]

class CanvasOld extends Component {
  constructor(props) {
    super(props)
    const { document } = this.props
    // const initialValue =
    //   localStorage.getItem("content") || "<p>Umm well fuck</p>"
    // const initialValue = Value.fromJSON(document) || Value.fromJSON(json, { normalize: false }),

    this.state = {
      focused: false,
      // document: Value.fromJSON(json, { normalize: false }),
      document: document
        ? Value.fromJSON(document)
        : Value.fromJSON(json, { normalize: false }),
      // document: html.deserialize(<p>WTF IS THIS SHIt</p>),
      // document: htmlDeserialised.document,
      // value: html.deserialize(initialValue),
      // document: html.deserialize(initialValue),
      // document: document
      //   ? Value.fromJSON(document)
      //   : Value.fromJSON(json, { normalize: false }),
      // document: initialValue,
    }
  }
  editorChange = ({ value }) => {
    // this.setState({ document: value })
    // Check to see if the document has changed before saving.
    if (value.document != this.state.document) {
      // const content = JSON.stringify(value.toJSON())
      this.setState({ document: value })
      // localStorage.setItem('content', content)
    }
  }

  // Define a new handler which prints the key that was pressed.
  onKeyDown = (event, change) => {
    if (!event.ctrlKey) return

    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case "b": {
        event.preventDefault()
        change.toggleMark("bold")
        return true
      }
      case "i": {
        event.preventDefault()
        change.toggleMark("italic")
        return true
      }
      // When "`" is pressed, keep our existing code block logic.
      case "`": {
        const isCode = change.value.blocks.some(block => block.type == "code")
        event.preventDefault()
        change.setBlocks(isCode ? "paragraph" : "code")
        return true
      }
    }
  }

  renderNode = props => {
    switch (props.node.type) {
      case "code":
        return <CodeMark {...props} />
      case "heading":
        return <HeaderMark {...props} />
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <strong>{props.children}</strong>
      // Add our new mark renderers...
      case "code":
        return <code>{props.children}</code>
      case "italic":
        return <em>{props.children}</em>
      case "strikethrough":
        return <del>{props.children}</del>
      case "underline":
        return <u>{props.children}</u>
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
        {/* <Editor
          onFocus={() => this.onFocus()}
          // onBlur={() => this.updateDocument(document)}
          onBlur={() => this.onBlur()}
          renderPlaceholder={renderPlaceholder}
          value={document}
          plugins={plugins}
          onChange={this.editorChange}
          onKeyDown={this.onKeyDown}
          // renderNode={this.renderNode}
          renderMark={this.renderMark}
        /> */}
        <Editor
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          plugins={plugins}
          value={document}
          onChange={this.editorChange}
          renderMark={this.renderMark}
        />
      </Fragment>
    )
  }
}

export default CanvasOld
