import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"

import DocumentDataPiper from "../containers/DocumentDataPiper"

class DataPiper extends Component {
  render() {
    return <DocumentDataPiper />
  }
}

export default compose(
  withRouter,
  withApollo
)(DataPiper)
