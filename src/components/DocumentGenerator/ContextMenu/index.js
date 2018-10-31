import React, { Fragment } from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
// Components
import ContextSubMenu from "./ContextSubMenu"
import ContextItem from "./ContextItem"

const styles = theme => ({
  contextMenu: {},
  contextMenuName: {
    fontSize: "1rem",
    fontWeight: 900,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.375em",
    color: "rgba(0, 0, 0, 0.54)",
    // margin: 0,
    // padding: `${theme.spacing.unit * 2} 0`,
  },
  menuItem: {
    fontSize: "0.75rem",
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.0em",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
  },
})

class ContextMenuGenerator extends React.Component {
  constructor(props) {
    super(props)
  }

  renderChildrenForever = items => {
    const { classes, name } = this.props
    return (
      <div className={classes.contextMenu}>
        <h1 className={classes.contextMenuName}>{name}</h1>
        {items.map((item, itemIdx) => {
          return (
            <div>
              {item.component && item.component}
              {item.items ? (
                <ContextSubMenu item={item} />
              ) : (
                <ContextItem item={item} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { classes, name, conf } = this.props
    console.log("The context menu generator config => ", conf)
    return (
      <Fragment>
        {conf.items && this.renderChildrenForever(conf.items)}
      </Fragment>
    )
  }
}

export default withStyles(styles)(ContextMenuGenerator)
