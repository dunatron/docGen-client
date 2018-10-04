import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
// Components
import RenderSection from "./RenderSection"
import DocumentSection from "./DocumentSection"

const styles = theme => ({})

const FontPicker = props => {
  const { classes } = props
  const { pageAttributes, pageDimensions, sections } = props
  return (
    <Fragment>
      <Droppable droppableId="documentDroppable" type="DocumentCanvas">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              border: "1px solid purple",
              height: `${pageDimensions.height}px`,
              width: `${pageDimensions.width}px`,
              backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            }}
            {...provided.droppableProps}>
            {sections.map((section, sectionIdx) => {
              return (
                // <RenderSection
                //   sectionId={sectionIdx}
                //   key={sectionIdx}
                //   section={section}
                //   pageAttributes={pageAttributes}
                // />
                <DocumentSection key={sectionIdx} />
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
