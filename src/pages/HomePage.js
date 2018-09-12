import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import SampleListContainer from "../containers/SampleListContainer"

class HomePage extends Component {
  render() {
    return (
      <FullPage
        children={[
          <SampleListContainer
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
