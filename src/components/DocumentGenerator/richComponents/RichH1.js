import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FontSettings from "../FontSettings"
import ColorSettings from "../ColorSettings"
import { Editor } from "slate-react"
import { Value } from "slate"
// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}
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

/**
 * ToDo: add a DB variable called sectionAttr which will be a Json.
 * this will hold thing like fontSize etc
 *
 * - We need to determine when we are inside component. When we leave it should save itself to the db.
 * - WE can have some sort of font setter/section setter. This can be in the redux store under currComponentAttr
 * When a component is onFocus, we make a call to the redux store. Na each component can have its own little bar to adjust this stuff
 *
 */

function checkPageFocus() {
  var info = document.getElementById("message")

  if (document.hasFocus()) {
    info.innerHTML = "The document has the focus."
  } else {
    info.innerHTML = "The document doesn't have the focus."
  }
}
class RichH1 extends Component {
  _handleInitialAttributes = attributes => {
    return {
      fontSize: 8,
      ...attributes,
    }
  }

  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    const {
      section: { rawContent },
    } = this.props
    const { document } = rawContent ? rawContent : initialValue

    this.state = {
      content: rawContent ? rawContent.value : "",
      attr: this._handleInitialAttributes(rawContent ? rawContent.attr : {}),
      focused: false,
      document: document ? Value.fromJSON(document) : initialValue,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    // alert("Component is dismopunting")
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  /**
   * Alert if clicked on outside of element
   * Note: ToDo: lift this functionality up to render section.
   * this would work by the map func. Each would call the handleClick Outside, and parse up the info it needs.
   * This is simply to implement the DRY approach.
   */
  handleClickOutside(event) {
    const { focused } = this.state
    const {
      section: { id },
    } = this.props
    const { content, attr, document } = this.state
    if (focused) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        // alert("You clicked outside of me!")
        this._saveSection(id, content, attr, document)
        this.setState({
          focused: false,
        })
      }
    }
  }

  handleChange = value => {
    this.setState({
      content: value,
    })
  }

  _saveSection = async (id, content, attr, document) => {
    // const jsonContent = JSON.stringify(content)
    const jsonContent = {
      value: content,
      attr: attr,
      document: document,
    }
    const section = {
      id: id,
      rawContent: jsonContent,
    }
    this.props.update(section)
  }

  handleFocus = () => {
    this.setState({
      focused: true,
    })
  }

  // handleBlur = () => {
  //   const { content, attr } = this.state
  //   const { id } = this.props
  //   this._saveSection(id, content, attr)
  //   this.setState({
  //     focused: false,
  //   })
  // }

  handleAttributeChange = (name, value) => {
    const attributes = this.state.attr
    attributes[name] = value

    this.setState({
      attr: attributes,
    })
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
        return <CodeNode {...props} />
    }
  }

  render() {
    const {
      classes,
      section: { type, rawContent, id },
      pageAttributes,
    } = this.props
    const { content, attr, focused, document } = this.state

    return (
      <div
        style={focused ? { border: "3px solid green" } : {}}
        ref={this.setWrapperRef}
        onFocus={() => this.handleFocus()}
        // onBlur={() => this.handleBlur()}
      >
        <span>h1</span>
        {focused && (
          <Fragment>
            <FontSettings
              attr={attr}
              changeAttr={(name, val) => this.handleAttributeChange(name, val)}
            />
            <ColorSettings
              changeColor={color => this.handleAttributeChange("color", color)}
            />
            <Editor
              value={document}
              onChange={this.editorChange}
              onKeyDown={this.onKeyDown}
              renderNode={this.renderNode}
            />
            {/* <Editor
              autoCorrect={Boolean}
              autoFocus={Boolean}
              className={String}
              onChange={Function}
              placeholder={String || Element}
              plugins={Array}
              readOnly={Boolean}
              role={String}
              spellCheck={Boolean}
              value={Value}
              style={Object}
              tabIndex={Number}
            /> */}
          </Fragment>
        )}
        {/* <FontSettings attr={attr} /> */}

        <div style={{ fontSize: `${attr.fontSize}px`, color: `${attr.color}` }}>
          Content: {content}
        </div>
        {/* <div style={{ fontSize: "40px" }}>Content: {content}</div> */}
        <TextField
          // label="None"
          // onBlur={() => this._saveSection(id, content, attr)}
          // onBlur={() => this.handleBlur()}
          // onFocus={() => this.handleFocus()}
          id="margin-none"
          placeholder="NEW SECTION H1..."
          className={classes.textField}
          value={content}
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(RichH1)
