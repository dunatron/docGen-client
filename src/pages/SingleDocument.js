import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import SingleDocumentContainer from "../containers/SingleDocumentContainer"

class SingleDocument extends Component {
  render() {
    return (
      <FullPage
        children={[
          <div>Here is where our Magic begins</div>,
          <SingleDocumentContainer />,
        ]}
      />
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(SingleDocument)
