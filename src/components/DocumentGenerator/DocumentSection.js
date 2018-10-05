import React, { Component, Fragment } from "react"
// section by type
import RenderSectionByType from "./RenderSectionByType"

class DocumentSection extends React.Component {
  constructor(props) {
    super(props)
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef()
    this.sectionRef = React.createRef()
    this.focusSection = this.focusSection.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    const {
      section: { id, type, rawContent },
    } = this.props

    this.state = {
      focused: false,
      id,
      type,
      rawContent,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside(event) {
    const { focused } = this.state
    if (focused) {
      if (this.sectionRef && !this.sectionRef.current.contains(event.target)) {
        this.setState({
          focused: false,
        })
      }
      // if (this.sectionRef) {
      //   this.setState({
      //     focused: false,
      //   })
      // }
      // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //   this.setState({
      //     focused: false,
      //   })
      // }
    }
  }

  focusSection() {
    // this.textInput.current.focus()
    console.log("Current sectionRef => ", this.sectionRef.current)
    this.setState({
      focused: true,
    })
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    const { focused } = this.state
    const { section } = this.props
    console.log("The section ", section)
    return (
      <div
        ref={this.sectionRef}
        onFocus={this.focusSection}
        style={focused ? { border: "2px dashed green" } : {}}>
        <input placeholder="Some sort of placeholder" ref={this.textInput} />
        <div s-attr={section.id}>
          <h2>Clicking me shouldnt disable the</h2>
        </div>
        <RenderSectionByType
          section={section}
          update={section => {
            console.log("Update state section ", section)
          }}
        />
      </div>
    )
  }
}

export default DocumentSection
