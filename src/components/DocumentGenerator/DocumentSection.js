import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { graphql, withApollo, compose } from "react-apollo"
// section by type
import RenderSectionByType from "./RenderSectionByType"
// Mutations
import { UPDATE_SECTION_MUTATION } from "../../mutations/updateSection"

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
    return (
      <div
        ref={this.sectionRef}
        onFocus={this.focusSection}
        style={focused ? { border: "2px dashed green" } : {}}>
        <RenderSectionByType
          section={section}
          update={section => this._updateSection(section)}
        />
      </div>
    )
  }

  _updateSection = ({ id, rawContent }) => {
    // UPDATE_SECTION_MUTATION
    this.props.updateSection({
      variables: {
        sectionId: id,
        rawContent: rawContent,
      },
    })
  }
}

// export default DocumentSection

export default compose(
  graphql(UPDATE_SECTION_MUTATION, { name: "updateSection" }),
  withApollo
)(DocumentSection)
