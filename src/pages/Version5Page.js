import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"

class Version5Page extends Component {
  render() {
    return (
      <FullPage
        children={[
          <iframe src="http://localhost:3001/" width="100%" height="100%" />,
        ]}
      />
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(Version5Page)
