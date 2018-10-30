import React, { Fragment } from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
// Components
import ContextSubMenu from "./ContextSubMenu"

const styles = theme => ({
  contextMenu: {},
  menuItem: {
    fontSize: "0.75rem",
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.375em",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
  },
})

class ContextItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, conf, item } = this.props
    console.log("The context menu generator config => ", conf)

    if (item.component) {
      return item.component
    }

    if (item.items) {
      return <ContextSubMenu item={item} />
    }

    return (
      <MenuItem className={classes.menuItem} onClick={() => item.action()}>
        {item.icon && item.icon}
        {item.title}
      </MenuItem>
    )
  }
}

export default withStyles(styles)(ContextItem)
