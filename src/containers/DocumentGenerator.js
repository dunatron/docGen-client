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
    console.log("onDragEnd Finished ", result)
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
      alert("Re Order the sections?")
    }
  }

  onDragStart = () => {
    console.log("onDragStart start ")
    // if (window.navigator.vibrate) {
    //   window.navigator.vibrate(100)
    // }
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

  renderDocumentGenerator = document => {
    const { screenDPI } = this.state
    const { docGen } = this.props
    const { pageAttributes } = docGen
    const pageDimensions = this.renderPage(screenDPI)

    const calculatedPageHeight =
      pageAttributes.pageHeight * (pageAttributes.percentage / 100)

    const calculatedPageWidth =
      pageAttributes.pageWidth * (pageAttributes.percentage / 100)

    const h1FontSiz = 36 * (pageAttributes.percentage / 100)
    const pFontStyle = 13 * (pageAttributes.percentage / 100)

    const { template, data, Component } = this.props

    if (!template) return false

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
            sections={document.sections}
            pageAttributes={pageAttributes}
            pageDimensions={{
              height: calculatedPageHeight,
              width: calculatedPageWidth,
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
  withStyles(styles),
  withApollo,
  reduxWrapper
)(DocumentGenerator)
