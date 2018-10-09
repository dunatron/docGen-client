import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = theme => ({})

const FontPicker = props => {
  const { classes } = props
  return (
    <Fragment>
      <Droppable droppableId="fontDroppable" type="DocumentCanvas">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            }}
            {...provided.droppableProps}>
            <Draggable draggableId="h1" index={0}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    type="submit"
                    onClick={e => alert("add drag n Drop")}>
                    H1
                  </Button>
                </div>
              )}
            </Draggable>
            <Draggable draggableId="p" index={1}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    type="submit"
                    onClick={e => alert("add drag n Drop")}>
                    P
                  </Button>
                </div>
              )}
            </Draggable>
            <Draggable draggableId="columns" index={2}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    type="submit"
                    onClick={e => alert("add drag n Drop")}>
                    columns
                  </Button>
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  )
}

export default withStyles(styles)(FontPicker)
