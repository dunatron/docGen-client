import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { compose } from "react-apollo/index"
// Components
import BackButton from "../components/BackButton"
// Menus
import LongMenu from "../components/LongMenu"
import AccountMenu from "../components/AccountMenu"
// Config
import routesConf from "../configs/routesConf"
// Redux
import { logoutUser } from "../actions/userActions"
import { connect } from "react-redux"

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

class AppBarContainer extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  logoutUser = () => {
    this.props.logoutUser()
    this.props.history.push(`/`)
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
    const { classes, history, match } = this.props
    const { pathname } = history.location

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {pathname && pathname !== "/" && <BackButton />}
            <div>[NOMOS HUB]</div>
            <LongMenu items={routesConf.filter(route => route.main)} />

            <AccountMenu logoutUser={() => this.logoutUser()} />
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

// export default withRouter(compose(withStyles(styles))(AppBarContainer))

const reduxWrapper = connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
  })
)

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  reduxWrapper
)(AppBarContainer)
