import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    background: "#FFF",
    border: "2px solid green",
    zIndex: 99999999,
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
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  // handleClickOutside(event) {
  //   alert(" I am a dog in the wind")
  // }

  getDynamicContextStyle = ({ x, y }) => {
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    console.group("getDynamicContextStyle")
    console.log("screenW => ", screenW)
    console.log("screenH => ", screenH)
    console.log("x => ", x)
    console.log("y => ", y)
    console.groupEnd()
    // return { position: "fixed", top: y, left: x }
    return { position: "absolute", top: 0, left: 0 }
    // return { position: "absolute", top: y, left: x }
  }

  render() {
    const { classes, children, contextDimensions } = this.props
    const contextStyle = this.getDynamicContextStyle(contextDimensions)
    return (
      <div
        // ref={this.contextMenuRef}
        ref={this.setContextMenuRef}
        className={classes.root}
        style={contextStyle}>
        <h1>Contetx Options</h1>
        {children}
      </div>
    )
  }
}

// export default ContextOptions

export default withStyles(styles)(ContextOptions)

// class ContextOptions extends React.Component {
//   constructor(props) {
//     super(props)

//     this.textInput = null

//     this.setContextMenuRef = element => {
//       this.textInput = element
//     }

// this.focusTextInput = () => {
//   // Focus the text input using the raw DOM API
//   if (this.textInput) this.textInput.focus()
// }
//   }

//   componentDidMount() {
//     // autofocus the input on mount
//     this.focusTextInput()
//   }

//   render() {
//     // Use the `ref` callback to store a reference to the text input DOM
//     // element in an instance field (for example, this.textInput).
//     return (
//       <div>
//         <input type="text" ref={this.setContextMenuRef} />
//         <input
//           type="button"
//           value="Focus the text input"
//           onClick={this.focusTextInput}
//         />
//       </div>
//     )
//   }
// }

// export default ContextOptions
