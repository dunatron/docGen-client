import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class AlertMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      alertText: this.props.alertText,
    }
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ open: false })
    this.dismissAlert()
  }

  dismissAlert = () => {
    this.props.dismissAlert()
  }

  render() {
    const { classes, alertText } = this.props
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{alertText}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

AlertMessage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AlertMessage)
