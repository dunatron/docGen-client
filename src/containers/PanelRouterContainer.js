import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "react-apollo/index"
// components
import RoutePanel from "../components/RoutePanel"
// Config
import routesConf from "../configs/routesConf"

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flex: "1 1 0",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    padding: theme.spacing.unit * 4,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

const routes = [
  { title: "Set Organisation", url: "/setorg" },
  { title: "Nomos Version 4", url: "/v4" },
  { title: "Nomos Version 5", url: "/v5" },
  { title: "DocY", url: "/docy" },
  { title: "DocGen", url: "/docgen" },
]

class PanelRouterContainer extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handlePageChange = url => {
    this.props.history.push(url)
  }

  _renderPanel = route => (
    <RoutePanel
      route={route}
      handleClick={() => this.handlePageChange(route.url)}
    />
  )

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { classes, history, match } = this.props

    return (
      <div className={classes.root}>
        {routesConf.filter(route => route.panel).map((route, routeIdx) => {
          return this._renderPanel(route)
        })}
      </div>
    )
  }
}

PanelRouterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

// export default MenuAppBar

export default withRouter(compose(withStyles(styles))(PanelRouterContainer))
