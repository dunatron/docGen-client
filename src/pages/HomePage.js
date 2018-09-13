import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import DocumentsListContainer from "../containers/DocumentsListContainer"
// components
import CreateDocument from "../components/CreateDocument"

class HomePage extends Component {
  render() {
    return (
      <FullPage
        children={[
          <CreateDocument />,
          <DocumentsListContainer
            location={this.props.location}
            match={this.props.match}
          />,
        ]}
      />
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(HomePage)
