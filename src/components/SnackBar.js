import React from "react"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"

class SnackBar extends React.Component {
  state = {
    open: true,
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      position: { vertical = "bottom", horizontal = "left" },
      message,
    } = this.props
    const { open } = this.state
    return (
      <div>
        {/* <Button
          onClick={this.handleClick({ vertical: "top", horizontal: "center" })}>
          Top-Center
        </Button>
        <Button
          onClick={this.handleClick({ vertical: "top", horizontal: "right" })}>
          Top-Right
        </Button>
        <Button
          onClick={this.handleClick({
            vertical: "bottom",
            horizontal: "right",
          })}>
          Bottom-Right
        </Button>
        <Button
          onClick={this.handleClick({
            vertical: "bottom",
            horizontal: "center",
          })}>
          Bottom-Center
        </Button>
        <Button
          onClick={this.handleClick({
            vertical: "bottom",
            horizontal: "left",
          })}>
          Bottom-Left
        </Button>
        <Button
          onClick={this.handleClick({ vertical: "top", horizontal: "left" })}>
          Top-Left
        </Button> */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    )
  }
}

export default SnackBar
