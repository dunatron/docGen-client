import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
import H1Comp from "./inputs/H1Comp"

const styles = theme => ({})

const FontPicker = props => {
  const { classes } = props
  const { pageAttributes, pageDimensions, documentComponents } = props
  return (
    <Fragment>
      <Droppable droppableId="fontDragAndDrop" type="DocumentCanvas">
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
            {/* <h1>This Is the Document Canvas. Pages</h1>
            <p>
              Pages Will Exist in here. Pages will be composed of components
              dropped ed in here. Inside of here it will get create its own
              components, ie H1, h2, p etc.
            </p>
            <p>
              Now we can save this canvas away with these created compionents.
              we save the type. and we will also roll up the state of each
              component. That way wen we receive from server we can rinitialise
              these font components based on their type. And fill them with
              their data. fontSize, color, style, and of course content
            </p> */}
            {documentComponents.map((fontComponent, fcIndex) => {
              if (fontComponent.type === "h1") {
                return (
                  <H1Comp
                    index={fcIndex}
                    contents={fontComponent.content}
                    percentage={pageAttributes.percentage}
                  />
                )
              }
              if (fontComponent.type === "p") {
                return (
                  // <PComp
                  //   index={fcIndex}
                  //   contents={fontComponent.content}
                  //   percentage={pageAttributes.percentage}
                  // />
                  <div>OK</div>
                )
              }
              return (
                <div>
                  <h1>{fontComponent.type}</h1>
                  <p>{fontComponent.content}</p>
                </div>
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
