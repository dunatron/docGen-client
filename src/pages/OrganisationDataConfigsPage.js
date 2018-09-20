import React, { Component } from "react"
import { withRouter } from "react-router"
import { compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import OrgDataConfigsContainer from "../containers/OrgDataConfigsContainer"
// components

class OrganisationDataConfigsPage extends Component {
  render() {
    return <FullPage children={[<OrgDataConfigsContainer />]} />
  }
}

// export default HomePage

export default compose(withRouter)(OrganisationDataConfigsPage)
