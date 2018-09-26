import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
import { Query } from "react-apollo"
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
