import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { compose, withApollo } from "react-apollo"
// Components
import WizardRoutes from "../components/Wizard/WizardRoutes"

class WizardsContainer extends Component {
  render() {
    return <WizardRoutes />
  }
}

export default compose(
  withRouter,
  withApollo
)(WizardsContainer)
