import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { compose, withApollo } from "react-apollo"
// Components
import AdminRoutes from "../components/Admin/AdminRoutes"

class AdminContainer extends Component {
  render() {
    return (
      <div>
        <h1>This is the Admin Container</h1>
        <AdminRoutes />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(AdminContainer)
