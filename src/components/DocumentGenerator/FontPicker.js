import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  richWrapper: {
    padding: theme.spacing.unit,
    // paddingLeft: theme.spacing.unit,
    // paddingRight: theme.spacing.unit,
    display: "flex",
  },
  richComponentBtn: {
    padding: theme.spacing.unit,
  },
})

const FontPicker = props => {
  const { classes, theme } = props
  return (
    <Fragment>
      <Droppable droppableId="fontDroppable" type="DocumentCanvas">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classes.richWrapper}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "b2fab4" : "3FFF",
            }}
            {...provided.droppableProps}>
            <Draggable draggableId="h1" index={0}>
              {(provided, snapshot) => (
                <div
                  className={classes.richComponentBtn}
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
                  className={classes.richComponentBtn}
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
                  className={classes.richComponentBtn}
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
            <Draggable draggableId="table" index={3}>
              {(provided, snapshot) => (
                <div
                  className={classes.richComponentBtn}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    type="submit"
                    onClick={e => alert("add drag n Drop")}>
                    Table
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

export default withStyles(styles, { withTheme: true })(FontPicker)
