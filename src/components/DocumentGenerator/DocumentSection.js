import React, { Component, Fragment } from "react"

// class DocumentSection extends Component {
//   constructor(props) {
//     super(props)
//     this.sectionRef = React.createRef()
//     // this.focusTextInput = this.focusTextInput.bind(this)
//     this.focusSection = this.focusSection.bind(this)
// this.state = {
//   focused: false,
// }
//   }

//   focusSection() {
//     // Explicitly focus the text input using the raw DOM API
//     // Note: we're accessing "current" to get the DOM node
//     console.log("Focus section")
//     this.sectionRef.current.focus()
//     if (this.sectionRef) {
//       this.setState({
//         focused: true,
//       })
//     }

//     if (this.sectionRef.current) {
//       console.log("THIS IS THE CORRECT WRAPPER REF => ", this.wrapperRef)
//       this.setState({
//         focused: false,
//       })
//     }
//   }

//   render() {
//     const { focused } = this.state
//     return (
//       <div
//         ref={this.sectionRef}
//         style={focused ? { border: "2px dashed green" } : {}}>
//         <h1>I am a section </h1>
//         <div onClick={this.focusSection}>[CLICK TO FOCUS SECTION]</div>
//       </div>
//     )
//   }
// }

// export default DocumentSection
class DocumentSection extends React.Component {
  constructor(props) {
    super(props)
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef()
    this.sectionRef = React.createRef()
    this.focusSection = this.focusSection.bind(this)
    this.state = {
      focused: false,
    }
  }

  focusSection() {
    this.textInput.current.focus()
    console.log("Current sectionRef => ", this.sectionRef.current)
    this.setState({
      focused: true,
    })
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    const { focused } = this.state
    return (
      <div
        ref={this.sectionRef}
        onFocus={this.focusSection}
        style={focused ? { border: "2px dashed green" } : {}}>
        <input placeholder="Some sort of placeholder" ref={this.textInput} />
      </div>
    )
  }
}

export default DocumentSection
