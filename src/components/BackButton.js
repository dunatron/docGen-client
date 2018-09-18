import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "react-apollo/index"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router"

const styles = theme => ({
  button: {
    borderRadius: 0,
    margin: theme.spacing.unit * 2,
  },
})

class BackButton extends Component {
  render() {
    const { classes } = this.props
    return (
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        type="submit"
        onClick={() => this.handleBackButton()}>
        Back
      </Button>
    )
  }

  handleBackButton = () => {
    this.props.history.goBack()
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(BackButton)
