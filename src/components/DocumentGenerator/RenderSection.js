import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { graphql, withApollo, compose } from "react-apollo"
// Rich Components
import RichH1 from "./richComponents/RichH1"
import RichP from "./richComponents/RichP"
// Queries
// Mutations
import { UPDATE_SECTION_MUTATION } from "../../mutations/updateSection"
// slate
import { Value } from "slate"

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

class RenderSection extends Component {
  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    const {
      section: { id, type, rawContent },
    } = this.props
    const { document } = rawContent ? rawContent : initialValue

    this.state = {
      focused: false,
      id,
      type,
      rawContent,
      document: document ? Value.fromJSON(document) : initialValue,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
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
    if (focused) {
      // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //   this.setState({
      //     focused: false,
      //   })
      // }
      // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //   this.setState({
      //     focused: false,
      //   })
      // }
      // console.log("The event itself => ", event)
      // console.log("event.target ", event.target)
      // console.log("It is focuused ", focused)
      console.log("this.wrapperRef) =>  ", this.wrapperRef)
      // if (this.wrapperRef) {
      //   console.log("THIS IS THE CORRECT WRAPPER REF => ", this.wrapperRef)
      //   this.setState({
      //     focused: false,
      //   })
      // }
    }
  }

  renderSectionByType = (section, pageAttributes) => {
    switch (section.type) {
      case "h1":
        return (
          <RichH1
            sIdx={this.state.id}
            document={this.state.document}
            update={section => this._updateSection(section)}
          />
        )
      case "p":
        return (
          <RichP
            section={section}
            pageAttributes={pageAttributes}
            update={section => this._updateSection(section)}
          />
        )
      default:
        break
    }
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

  handleFocus = () => {
    this.setState({
      focused: true,
    })
  }

  render() {
    const { focused, id } = this.state
    const { section, pageAttributes } = this.props
    const richComponentToRender = this.renderSectionByType(
      section,
      pageAttributes
    )
    return (
      <Fragment>
        {focused}
        <div
          data-attr={`render-section-${id}`}
          onFocus={() => this.handleFocus()}
          ref={this.setWrapperRef}
          style={
            focused
              ? { border: "3px solid green" }
              : { border: "1px solid red" }
          }>
          {richComponentToRender}
        </div>
      </Fragment>
    )
  }
}

export default compose(
  graphql(UPDATE_SECTION_MUTATION, { name: "updateSection" }),
  withApollo
)(RenderSection)
