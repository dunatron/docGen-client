import React, { Component, Fragment } from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import SuggestionsPlugin from "../../../suggestions/index"

// Serializer
import Html from "slate-html-serializer"
// Editor Config
import { rules, plugins } from "./EditorConfig"

// Marks
import RenderMark from "../render_marks/RenderMark"
import CodeMark from "../render_nodes/CodeMark"
import HeaderMark from "../render_nodes/HeaderMark"
import { withStyles } from "@material-ui/core/styles"
// components
import EditorBar from "./EditorBar"
import HoverMenu from "../HoverMenu"
// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
// Important: This idea below will allow us to add classes and attributes to our objects as html
// https://docs.slatejs.org/walkthroughs/saving-and-loading-html-content

console.log("The suggestyions PLUGIN => ==== => ", SuggestionsPlugin)

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
  componentDidMount = () => {
    this.updateMenu()
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.document !== prevProps.document) {
      console.log("My god we need to fetch the document again!")
    }
    this.updateMenu()
  }
  editorChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document != this.state.document) {
      this.setState({ document: value })
    }
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
  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { document } = this.state
    const { fragment, selection } = document

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style")
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }
  /**
   * On redo in history.
   *
   */

  onClickRedo = event => {
    event.preventDefault()
    const { document } = this.state
    const change = document.change().redo()
    this.editorChange(change)
  }

  /**
   * On undo in history.
   *
   */

  onClickUndo = event => {
    event.preventDefault()
    const { document } = this.state
    const change = document.change().undo()
    this.editorChange(change)
  }

  render() {
    const { document, focused } = this.state
    const { history } = document
    return (
      <Fragment>
        {focused ? "editor is focused" : null}
        <HoverMenu
          innerRef={menu => (this.menu = menu)}
          value={document}
          onChange={this.editorChange}
        />
        {focused ? (
          <EditorBar
            redo={this.onClickRedo}
            undo={this.onClickUndo}
            history={history}
          />
        ) : null}

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

export default withStyles(styles, { theme: true })(RichEditor)
