import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    flexBasis: 0,
    minWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    boxSizing: "border-box",
    textAlign: "left",
  },
})

class FullPage extends Component {
  render() {
    const { children, classes, history, injectStyles } = this.props
    const { pathname } = history.location

    return (
      <Fragment>
        {children && (
          <Paper
            style={{ ...injectStyles }}
            className={classes.root}
            square={true}>
            {/* {pathname && pathname !== "/" && <BackButton />} */}
            {children.map((component, idx) => {
              return component
            })}
          </Paper>
        )}
      </Fragment>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  withStyles(styles)
)(FullPage)
