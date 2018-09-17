import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import DocumentDataPiper from "../containers/DocumentDataPiper"

class DataPiper extends Component {
  render() {
    return (
      <FullPage
        children={[<div>Document Data Piper</div>, <DocumentDataPiper />]}
      />
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(DataPiper)
