import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
// Components
import DocumentSection from "./DocumentSection"

const styles = theme => ({})

const getCanvasStyle = (isDraggingOver, pageDimensions, pageAttributes) => ({
  padding: "15px",
  zoom: pageAttributes.percentage / 100,
  border: "1px solid purple",
  height: `${pageDimensions.height}px`,
  width: `${pageDimensions.width}px`,
  // backgroundColor: snapshot.isDraggingOver ? "blue" : "white",
  backgroundColor: isDraggingOver ? "#536dff" : "white",
})

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "#FFF",
  background: isDragging ? "#b2fab4" : "#FFF",
  // styles we need to apply on draggables
  ...draggableStyle,
})

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
            style={getCanvasStyle(
              snapshot.isDraggingOver,
              pageDimensions,
              pageAttributes
            )}
            {...provided.droppableProps}>
            {sections.map((section, sectionIdx) => {
              return (
                <Draggable
                  key={sectionIdx}
                  index={sectionIdx}
                  draggableId={section.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}>
                      <DocumentSection
                        pageAttributes={pageAttributes}
                        documentId={documentId}
                        section={section}
                        key={sectionIdx}
                      />
                      {/* {section.type} */}
                    </div>
                  )}
                </Draggable>
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
