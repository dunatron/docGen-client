import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"

import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData"

// const drawerWidth = 240
const drawerWidth = 440

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    // height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "appBarShift-left": {
    marginLeft: drawerWidth,
  },
  "appBarShift-right": {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  "content-left": {
    marginLeft: -drawerWidth,
  },
  "content-right": {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "contentShift-left": {
    marginLeft: 0,
  },
  "contentShift-right": {
    marginRight: 0,
  },
})

class DrawerPage extends React.Component {
  state = {
    open: false,
    anchor: "left",
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    })
  }

  render() {
    const {
      children,
      drawItems,
      title,
      drawTitle,
      classes,
      theme,
      history,
    } = this.props
    const { pathname } = history.location
    const { anchor, open } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}>
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  open && classes.hide
                )}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerHeader}>
              {drawTitle}
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            {/* {drawItems &&
              drawItems.map((listItem, listIdx) => {
                return listItem
              })} */}
            {drawItems &&
              drawItems.map((listItem, listIdx) => {
                return <Fragment key={listIdx}>{listItem}</Fragment>
              })}
          </Drawer>
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open,
              }
            )}>
            <div className={classes.drawerHeader} />
            <Fragment>
              {children && (
                <Paper className={classes.root} square={true}>
                  {/* {children.map((component, idx) => {
                    return component
                  })} */}
                  {/* {children.map(component => component)} */}
                  {children.map((component, idx) => {
                    return <Fragment key={idx}>{component}</Fragment>
                  })}
                </Paper>
              )}
            </Fragment>
          </main>
        </div>
      </div>
    )
  }
}

DrawerPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

// export default withStyles(styles, { withTheme: true })(DataDrawer)

export default compose(
  withRouter,
  withApollo,
  withStyles(styles, { withTheme: true })
)(DrawerPage)
