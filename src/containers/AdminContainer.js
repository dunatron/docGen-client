import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
import { Query } from "react-apollo"
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
