import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import AdminContainer from "../containers/AdminContainer"

class AdminPage extends Component {
  render() {
    return <FullPage children={[<AdminContainer />]} />
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(AdminPage)
