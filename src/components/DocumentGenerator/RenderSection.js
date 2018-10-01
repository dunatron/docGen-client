import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { graphql, withApollo, compose } from "react-apollo"
// Rich Components
import RichH1 from "./richComponents/RichH1"
import RichP from "./richComponents/RichP"
// Queries
// Mutations
import { UPDATE_SECTION_MUTATION } from "../../mutations/updateSection"

class RenderSection extends Component {
  renderSectionByType = (section, pageAttributes) => {
    // return (
    //   <div style={{ marginBottom: "40px" }}>
    //     <div>Section ID => {section.id}</div>
    //     <div>Section Type => {section.type}</div>
    //     <div>Section rawContent => {section.rawContent}</div>
    //   </div>
    // )
    switch (section.type) {
      case "h1":
        return (
          <RichH1
            section={section}
            pageAttributes={pageAttributes}
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

  render() {
    const { section, pageAttributes } = this.props
    const richComponentToRender = this.renderSectionByType(
      section,
      pageAttributes
    )
    return <Fragment>{richComponentToRender}</Fragment>
  }
}
// export default RenderSection

export default compose(
  graphql(UPDATE_SECTION_MUTATION, { name: "updateSection" }),
  withApollo
)(RenderSection)
