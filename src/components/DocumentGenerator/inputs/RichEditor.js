import React, { Component, Fragment } from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import faker from "faker"
// Serializer
import Html from "slate-html-serializer"
// Editor Config
import { rules, plugins } from "./EditorConfig"

// Marks
import RenderMark from "../render_marks/RenderMark"
import CodeMark from "../render_nodes/CodeMark"
import HeaderMark from "../render_nodes/HeaderMark"
import BoldMark from "../render_marks/BoldMark"
import ItalicMark from "../render_marks/ItalicMark"
import { props } from "docx"
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

class RichEditor extends Component {
  constructor(props) {
    super(props)
    const { document, pageAttributes } = this.props

    // Initialise document from it's json

    this.state = {
      focused: false,
      document: Value.fromJSON(document),
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.document !== prevProps.document) {
      console.log("My god we need to fetch the document again!")
    }
  }
  editorChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document != this.state.document) {
      this.setState({ document: value })
    }
  }

  onKeyDown = (event, change) => {
    if (event.key != "b" || !event.ctrlKey) return
    event.preventDefault()
    change.toggleMark("bold")
    return true
  }

  renderNode = props => {
    console.log("Render a node? ", props)
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
          onBlur={() => this.onBlur()}
          plugins={plugins}
          value={document}
          onChange={this.editorChange}
          renderNode={this.renderNode}
          renderMark={props => <RenderMark {...props} />}
        />
      </Fragment>
    )
  }
}

export default RichEditor
