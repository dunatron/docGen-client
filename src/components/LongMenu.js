import React from "react"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "react-apollo/index"
import theme from "../theme"

const ITEM_HEIGHT = 48
const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  menuItem: {
    color: theme.palette.primary.main,
  },
})
class LongMenu extends React.Component {
  state = {
    anchorEl: null,
    selected: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handlePageChange = url => {
    this.handleClose()
    this.props.history.push(url)
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const { items, history, match, classes } = this.props

    return (
      <div>
        <IconButton
          color="secondary"
          aria-label="More"
          aria-owns={open ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          color="primary"
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}>
          {items.map((item, idx) => (
            <MenuItem
              className={classes.menuItem}
              key={idx}
              color="primary"
              selected={item.url === history.location.pathname} // Can probs use react router?
              onClick={() => this.handlePageChange(item.url)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

// export default LongMenu

export default withRouter(compose(withStyles(styles))(LongMenu))
