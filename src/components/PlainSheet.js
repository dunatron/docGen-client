import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    flexBasis: 0,
    minWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    boxSizing: "border-box",
    textAlign: "left",
  },
})

class PlainSheet extends Component {
  render() {
    const { classes, children } = this.props
    return (
      <Fragment>
        {children && (
          <Paper square={true} className={classes.root}>
            {children.map((component, idx) => {
              return component
            })}
          </Paper>
        )}
      </Fragment>
    )
  }
}

export default withStyles(styles)(PlainSheet)
