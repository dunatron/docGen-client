import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"

import DocYContainer from "../containers/DocYContainer"

class DocYPage extends Component {
  render() {
    return <DocYContainer />
  }
}

export default compose(
  withRouter,
  withApollo
)(DocYPage)
