import React, { Component, Fragment } from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { connect } from "react-redux"
import { graphql, withApollo, compose } from "react-apollo"
import { updatePagePercentage } from "../actions/docGenActions"

// Components
import DocumentCanvas from "../components/DocumentGenerator/DocumentCanvas"
import FontPicker from "../components/DocumentGenerator/FontPicker"
import ShortCodePicker from "../components/DocumentGenerator/ShortCodePicker"
import PagePercentage from "../components/DocumentGenerator/PagePercentage"

// Queries
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"

// Mutations
import { POST_SECTION_MUTATION } from "../mutations/postSection"
import { UPDATE_SECTION_POSITION } from "../mutations/updateSectionPosition"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const getDroppableClasses = isDraggingOver =>
  classNames(styles.droppable, {
    [styles.isDraggingOver]: isDraggingOver,
  })

const getDraggableClasses = isDragging =>
  classNames(styles.draggable, {
    [styles.isDragging]: isDragging,
  })

// const reorder = (list, startIndex, endIndex) => {
//   console.log("Before re-order ", list)
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)
//   console.log("reorder result ", result)

//   console.log("DOCUMENT GENERATOR PROPS => ", this.props)

//   // const data = this.props.client.readQuery({
//   //   query: SINGLE_DOCUMENT_QUERY,
//   //   variables: { id: this.props.document.id },
//   // })

//   // data.singleDocument.sections = result

//   // console.log("The new List YOOOOOOOO => ", data)

//   return result
// }

class DocumentGenerator extends Component {
  state = {}

  constructor(props) {
    super(props)

    this.state = {
      screenDPI: 96,
    }
  }

  renderPage = screenDPI => {
    switch (screenDPI) {
      case 72:
        return
      case 96:
        return {
          width: 794,
          height: 1123,
        }
      case 150:
        return
      case 300:
        return
      case 600:
        return
      case 720:
        return
      case 1200:
        return
      case 1440:
        return
      case 2400:
        return
      case 2880:
        return

      default:
        return
    }
  }

  onDragEnd = result => {
    console.log("Our drag result... ", result)
    const { document } = this.props
    const { type, source, reason, destination, draggableId } = result
    // Creating  new section
    if (type === "DocumentCanvas" && source.droppableId === "fontDroppable") {
      this._createSection(document.id, draggableId)
    }
    // Reorder the canvas
    if (
      type === "DocumentCanvas" &&
      source.droppableId === "documentDroppable"
    ) {
      const sections = this._reorder(
        this.props.document.sections,
        result.source.index,
        result.destination.index
      )
      this._reorderSections(sections)
      console.log("Our sections const reordered => ", sections)
    }
  }

  onDragStart = () => {
    // if (window.navigator.vibrate) {
    //   window.navigator.vibrate(100)
    // }
  }

  _reorder = (list, startIndex, endIndex) => {
    console.log("Before re-order ", list)
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  _createSection = async (documentId, sectionType) => {
    this.props.postSection({
      variables: {
        type: sectionType,
        docId: documentId,
      },
      update: (store, { data: { postSection } }) => {
        const data = store.readQuery({
          query: SINGLE_DOCUMENT_QUERY,
          variables: { id: documentId },
        })
        data.singleDocument.sections.unshift(postSection)
        store.writeQuery({
          query: SINGLE_DOCUMENT_QUERY,
          data,
          variables: { id: documentId },
        })
      },
    })
  }

  _reorderSections = async sections => {
    console.log("Our sections to reorder! ", sections)

    const data = this.props.client.readQuery({
      query: SINGLE_DOCUMENT_QUERY,
      variables: { id: this.props.document.id },
    })

    data.singleDocument.sections = sections

    this.props.client.writeQuery({
      query: SINGLE_DOCUMENT_QUERY,
      data,
      variables: { id: this.props.document.id },
    })

    // id: "cjn17yjtkzm2x0b483140vyod"
    // position: 6
    // This is making a single request for each section
    // al we are doing is sending up the id and the position(int) so we are better to make 1 request
    sections.map((section, sectionIdx) => {
      // Update the position as sectionIdx
      const updatedSectionPos = { id: section.id, position: sectionIdx }
      this._updateSectionPosition(updatedSectionPos)
      // Batch update for positions?
    })
  }

  _updateSectionPosition = async ({ id, position }) => {
    // UPDATE_SECTION_MUTATION
    const res = await this.props.updateSectionPosition({
      variables: {
        sectionId: id,
        position: position,
      },
    })
    console.log("Yay we have updated!@! => ", res)
  }

  renderDocumentGenerator = document => {
    const { screenDPI } = this.state
    const { docGen } = this.props
    const { pageAttributes } = docGen
    const pageDimensions = this.renderPage(screenDPI)

    /**
     * We are using zoom atm, this would double down on the width and height...
     */
    const calculatedPageHeight =
      pageAttributes.pageHeight * (pageAttributes.percentage / 100)

    const calculatedPageWidth =
      pageAttributes.pageWidth * (pageAttributes.percentage / 100)

    const h1FontSiz = 36 * (pageAttributes.percentage / 100)
    const pFontStyle = 13 * (pageAttributes.percentage / 100)

    const { data, Component } = this.props

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}>
        <div>
          <FontPicker />
          {/* <ShortCodePicker shortCodes={SHORT_CODES} /> */}
          <PagePercentage
            percentage={pageAttributes.percentage}
            onChange={v => this.props.updatePagePercentage(v)}
          />
          <DocumentCanvas
            documentId={document.id}
            sections={document.sections}
            pageAttributes={pageAttributes}
            // pageDimensions={{
            //   height: calculatedPageHeight,
            //   width: calculatedPageWidth,
            // }}
            pageDimensions={{
              height: pageAttributes.pageHeight,
              width: pageAttributes.pageWidth,
            }}
          />
        </div>
      </DragDropContext>
    )
  }

  /**
   * Key Press Docs: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   */
  render() {
    const { document } = this.props
    return <Fragment>{this.renderDocumentGenerator(document)}</Fragment>
  }
}

const reduxWrapper = connect(
  state => ({
    docGen: state.docGen,
  }),
  dispatch => ({
    updatePagePercentage: percentage =>
      dispatch(updatePagePercentage(percentage)),
  })
)

export default compose(
  graphql(POST_SECTION_MUTATION, { name: "postSection" }),
  graphql(UPDATE_SECTION_POSITION, { name: "updateSectionPosition" }),

  withStyles(styles),
  withApollo,
  reduxWrapper
)(DocumentGenerator)
