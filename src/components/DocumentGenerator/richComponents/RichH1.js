import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FontSettings from "../FontSettings"

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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
    const { section } = this.props
    console.log("sections rawContent ", section.rawContent)

    this.state = {
      content: section.rawContent ? section.rawContent.value : "",
      attr: this._handleInitialAttributes(
        section.rawContent ? section.rawContent.attr : {}
      ),
      focused: false,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    alert("Component is dismopunting")
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    console.log("the node to set => ", node)
    this.wrapperRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    const { focused } = this.state
    if (focused) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        alert("You clicked outside of me!")
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

  _saveSection = async (id, content, attr) => {
    console.log("content?  ", content)
    // const jsonContent = JSON.stringify(content)
    const jsonContent = { value: content, attr: attr }
    console.log("jsonContent is => ", jsonContent)
    alert("Time to save the section")
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

  render() {
    const {
      classes,
      section: { type, rawContent, id },
      pageAttributes,
    } = this.props
    const { content, attr, focused } = this.state

    console.log("Section Attributes ", attr)

    return (
      <div
        ref={this.setWrapperRef}
        onFocus={() => this.handleFocus()}
        // onBlur={() => this.handleBlur()}
      >
        <h1>I am A rich H1 components</h1>
        {focused && <FontSettings attr={attr} />}
        {/* <FontSettings attr={attr} /> */}

        <div style={{ fontSize: `${attr.fontSize}px` }}>Content: {content}</div>
        {/* <div style={{ fontSize: "40px" }}>Content: {content}</div> */}
        <TextField
          // label="None"
          // onBlur={() => this._saveSection(id, content, attr)}
          // onBlur={() => this.handleBlur()}
          // onFocus={() => this.handleFocus()}
          id="margin-none"
          defaultValue="NEW SECTION"
          className={classes.textField}
          value={content}
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(RichH1)
