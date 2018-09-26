import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import WizardsContainer from "../containers/WizardsContainer"

class WizardsPage extends Component {
  render() {
    return <FullPage children={[<WizardsContainer />]} />
  }
}

export default compose(
  withRouter,
  withApollo
)(WizardsPage)
