import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// components
import OrganisationUsersList from "../components/Admin/OrganisationUsersList"

class OrganisationUsersPage extends Component {
  render() {
    return (
      <FullPage
        children={[
          <div>Display a list of the orgs users</div>,
          <OrganisationUsersList />,
        ]}
      />
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(OrganisationUsersPage)
