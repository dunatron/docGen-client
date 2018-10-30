// import React, { Fragment } from "react"
// import Menu from "@material-ui/core/Menu"
// import MenuItem from "@material-ui/core/MenuItem"
// import { withStyles } from "@material-ui/core/styles"

// const styles = theme => ({
//   contextMenu: {},
//   menuItem: {
//     fontSize: "0.75rem",
//     fontWeight: 400,
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     lineHeight: "1.375em",
//     color: "rgba(0, 0, 0, 0.54)",
//     padding: 0,
//   },
// })

// class ContextMenuGenerator extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   renderChildrenForever = items => {
//     const { classes } = this.props
//     return (
//       <div className={classes.contextMenu}>
//         {items.map((item, itemIdx) => {
//           return (
//             <div key={itemIdx}>
//               {item.component ? (
//                 item.component
//               ) : (
//                 <MenuItem
//                   className={classes.menuItem}
//                   onClick={() => item.action()}>
//                   {item.icon && item.icon}
//                   {item.title}
//                 </MenuItem>
//               )}

//               {item.items && (
//                 <div style={{ paddingLeft: "15px" }}>
//                   {this.renderChildrenForever(item.items)}
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>
//     )
//   }

//   render() {
//     const { classes, conf } = this.props
//     console.log("The context menu generator config => ", conf)
//     return (
//       <Fragment>
//         {conf.items && this.renderChildrenForever(conf.items)}
//       </Fragment>
//     )
//   }
// }

// export default withStyles(styles)(ContextMenuGenerator)

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

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class ContextMenuGenerator extends Component {
  state = {
    open: true,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <List
          component="Context-Menu"
          subheader={
            <ListSubheader component="div">Nested List Items</ListSubheader>
          }>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

ContextMenuGenerator.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ContextMenuGenerator)
