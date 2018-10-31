import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import ReactDOM from "react-dom"
const modalRoot = document.getElementById("context-menu-root")

const styles = theme => ({
  root: {
    background: "#FFF",
    zIndex: 99999999,
    padding: theme.spacing.unit * 2,
    borderRadius: 16,
    "-webkit-box-shadow": "inset 0px 0px 40px 2px rgba(0,72,81,1)",
    "-moz-box-shadow": "inset 0px 0px 40px 2px rgba(0,72,81,1)",
    "box-shadow": "inset 0px 0px 40px 2px rgba(0,72,81,1)",
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class ContextOptions extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.el = document.createElement("div")
    const { children, contextDimensions } = this.props

    this.contextMenuRef = null
    this.setContextMenuRef = element => {
      this.contextMenuRef = element
    }

    this.handleClickOutside = event => {
      // Focus the text input using the raw DOM API
      // if (this.textInput) this.textInput.focus()
      console.log("this.contextMenuRef => ", this.contextMenuRef)
      // alert("The obvious shit ")
      if (this.contextMenuRef && !this.contextMenuRef.contains(event.target)) {
        // close context menu via props.close
        this.props.close()
      }
    }

    // this.contextMenuRef = React.createRef()
    // Initialise document from it's json
    console.log("contextOptions props => ", this.props)
    this.state = {
      visibleContext: false,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
    modalRoot.removeChild(this.el)
  }

  getDynamicContextStyle = ({ x, y }) => {
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const screenPosX = window.screenX
    const screenPosY = window.screenY
    const windowPageXOffset = window.pageXOffset
    const windowPageYOffset = window.pageYOffset
    console.group("getDynamicContextStyle")
    console.log("The window => ", window)
    console.log("screenW => ", screenW)
    console.log("screenH => ", screenH)
    console.log("x => ", x)
    console.log("y => ", y)
    console.groupEnd()
    // return { position: "fixed", top: y, left: x }
    // return { position: "absolute", top: screenPosX, left: 0 }
    return {
      position: "absolute",
      top: windowPageYOffset + 40,
      left: windowPageXOffset + 40,
    }
    // return { position: "absolute", top: x, left: x }
    // return { position: "absolute", top: y, left: x }
  }

  render() {
    const { innerRef, classes, children, contextDimensions } = this.props
    const contextStyle = this.getDynamicContextStyle(contextDimensions)
    return ReactDOM.createPortal(
      <div
        style={contextStyle}
        ref={this.setContextMenuRef}
        className={classes.root}>
        {children}
      </div>,
      this.el
    )
  }
}

export default withStyles(styles)(ContextOptions)
