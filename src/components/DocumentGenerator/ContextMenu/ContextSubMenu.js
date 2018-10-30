import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import ListSubheader from "@material-ui/core/ListSubheader"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import SendIcon from "@material-ui/icons/Send"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import StarBorder from "@material-ui/icons/StarBorder"
// components
import ContextItem from "./ContextItem"

const styles = theme => ({
  root: {
    // width: "100%",
    maxWidth: 360,
    minWidth: 160,
    backgroundColor: theme.palette.background.paper,
    marginLeft: "16px",
    padding: 0,
  },
  listItem: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    alignContent: "space-evenly",
    fontSize: "0.75rem",
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.375em",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
  },
  listItemText: {},
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class ContextSubMenu extends Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { classes, item } = this.props

    // return (
    //   <div className={classes.root}>
    //     {item.items &&
    //       item.items.map((i, iIdx) => {
    //         return <ContextItem item={i} />
    //       })}
    //   </div>
    // )

    return (
      <div className={classes.root}>
        <List
          component="Context-Menu"
          // subheader={
          //   <ListSubheader component="div">{item.title}</ListSubheader>
          // }
        >
          <ListItem
            className={classes.listItem}
            button
            onClick={this.handleClick}>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
            <span>{item.title}</span>
            {/* <ListItemText
              className={classes.listItemText}
              inset
              primary={item.title}
            /> */}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding={false}
              className={classes.nested}>
              {item.items &&
                item.items.map((i, iIdx) => {
                  return <ContextItem item={i} />
                })}
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

ContextSubMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ContextSubMenu)
