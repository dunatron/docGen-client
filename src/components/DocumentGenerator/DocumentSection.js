import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { graphql, withApollo, compose } from "react-apollo"
// section by type
import RenderSectionByType from "./RenderSectionByType"
// Queries. Thi is to just update the document Query
import DOCUMENT_QUERY from "../../queries/Document.graphql"
// import { SINGLE_DOCUMENT_QUERY } from "../../queries/singleDocument"
// import DOCUMENT_QUERY from "../queries/Document.graphql"
// Mutations
import { UPDATE_SECTION_MUTATION } from "../../mutations/updateSection"
import { DELETE_SECTION_MUTATION } from "../../mutations/deleteSection"
// Icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import DragHandleIcon from "@material-ui/icons/DragHandleSharp"
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
      removing: false,
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
    this.setState({
      focused: true,
    })
  }

  renderFocusedComponents = dragHandle => {
    return (
      <Fragment>
        <div {...dragHandle}>
          <DragHandleIcon color="secondary" />
        </div>
        <div
          style={{ position: "absolute", top: -30, right: 0 }}
          onClick={() => this._deleteSection(this.state.id)}>
          <DeleteForeverIcon />
        </div>
      </Fragment>
    )
  }

  getSectionStyle = focused => ({
    // margin: focused ? "40px 0px" : 0,
    // margin: focused ? "32px 0 30px 0" : 0,
    // padding: focused ? "40px 0px" : 0,
    margin: 0,
    padding: 0,
    border: focused ? "1px dashed #b2fab4" : "none",
    position: "relative",
  })

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    const { focused, removing } = this.state
    const { section, pageAttributes, dragHandle } = this.props

    if (removing) {
      return (
        <div>
          <p>Removing {section.id}</p>
        </div>
      )
    }

    return (
      <div
        ref={this.sectionRef}
        onFocus={this.focusSection}
        style={this.getSectionStyle(focused)}>
        {focused ? this.renderFocusedComponents(dragHandle) : null}
        <RenderSectionByType
          pageAttributes={pageAttributes}
          focused={focused}
          section={section}
          delete={() => {
            this._deleteSection(section.id)
          }}
          update={section => this._updateSection(section)}
        />
      </div>
    )
  }

  /**
   * Ok we want top do Fragments on GraphQL. This way we just have to update the section!
   */
  _updateSection = async ({ id, rawContent }) => {
    // UPDATE_SECTION_MUTATION
    this.props.updateSection({
      variables: {
        sectionId: id,
        rawContent: rawContent,
      },
      // Try updating the new section...
      // update: (store, { data }) => {
      //   console.log("This is our data after the update => ", data)
      // },
    })
  }

  _deleteSection = async sectionId => {
    this.setState({ removing: true })
    try {
      const { documentId } = this.props
      const res = await this.props.deleteSection({
        variables: {
          sectionId: sectionId,
        },
        update: (store, { data: { postSection } }) => {
          const data = store.readQuery({
            query: DOCUMENT_QUERY,
            variables: { id: documentId },
          })
          const itemIdxToDelete = data.singleDocument.sections.findIndex(
            s => s.id === sectionId
          )
          data.singleDocument.sections.splice(itemIdxToDelete, 1)
          store.writeQuery({
            query: DOCUMENT_QUERY,
            data,
            variables: { id: documentId },
          })
        },
        // refetchQueries: [
        //   {
        //     query: SINGLE_DOCUMENT_QUERY,
        //     variables: { id: documentId },
        //   },
        // ],
      })
    } catch (e) {
      alert(e)
    } finally {
      this.setState({ removing: false })
    }
  }
}

// export default DocumentSection

export default compose(
  graphql(UPDATE_SECTION_MUTATION, { name: "updateSection" }),
  graphql(DELETE_SECTION_MUTATION, { name: "deleteSection" }),
  withApollo
)(DocumentSection)
