import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import CreateDataConfigContainer from "../containers/CreateDataConfigContainer"

class CreateDataConfigPage extends Component {
  render() {
    return <FullPage children={[<CreateDataConfigContainer />]} />
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(CreateDataConfigPage)
