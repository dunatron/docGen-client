import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
// Components
import DocumentSection from "./DocumentSection"

const styles = theme => ({})

const FontPicker = props => {
  const { classes } = props
  const { pageAttributes, pageDimensions, documentId, sections } = props
  console.log("Page aattributes => ", pageAttributes)
  return (
    <Fragment>
      <Droppable droppableId="documentDroppable" type="DocumentCanvas">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              padding: "15px",
              zoom: pageAttributes.percentage / 100,
              border: "1px solid purple",
              height: `${pageDimensions.height}px`,
              width: `${pageDimensions.width}px`,
              // backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
              backgroundColor: snapshot.isDraggingOver ? "teal" : "white",
            }}
            {...provided.droppableProps}>
            {sections.map((section, sectionIdx) => {
              return (
                <DocumentSection
                  pageAttributes={pageAttributes}
                  documentId={documentId}
                  section={section}
                  key={sectionIdx}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  )
}

export default withStyles(styles)(FontPicker)
