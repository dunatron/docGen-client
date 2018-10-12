import React, { Component, Fragment } from "react"
// Material UI Icons
import { withStyles } from "@material-ui/core/styles"
import UndoIcon from "@material-ui/icons/Undo"
import RedoIcon from "@material-ui/icons/Redo"

const styles = theme => ({
  bar: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFF",
    color: theme.palette.primary.main,
    bottom: -30,
    left: 0,
    zIndex: 99999,
  },
  amount: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class EditorBar extends Component {
  render() {
    const { classes, history, redo, undo } = this.props
    return (
      <div className={classes.bar}>
        <UndoIcon color="primary" onMouseDown={undo} />
        <span className={classes.amount}>{history.undos.size}</span>
        <RedoIcon color="primary" onMouseDown={undo} />
        <span className={classes.amount}>{history.redos.size}</span>
      </div>
    )
  }
}

// export default EditorBar
export default withStyles(styles)(EditorBar)
