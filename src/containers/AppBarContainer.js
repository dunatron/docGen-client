import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { compose } from "react-apollo/index"
// Menus
import LongMenu from "../components/LongMenu"
import AccountMenu from "../components/AccountMenu"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const routes = [{ title: "Home", url: "/" }, { title: "About", url: "/about" }]

class AppBarContainer extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handlePageChange = url => {
    this.handleClose()
    this.props.history.push(url)
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div>[DOC GEN]</div>
            <LongMenu items={routes} />
            <AccountMenu />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

// export default MenuAppBar

export default withRouter(compose(withStyles(styles))(AppBarContainer))
