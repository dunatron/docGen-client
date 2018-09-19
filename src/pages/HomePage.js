import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
// containers
import PanelRouteContainer from "../containers/PanelRouterContainer"
// components

const HomePageInfo = () => {
  return (
    <div>
      {/* <h1>[THE SOLUTION]</h1>
      <p>
        Ok. We have this thing called v4, this thing called v5, this thing
        called docY, this other thing called DocGen.
      </p>
      <p>[LETS MAKE THIS THE HUB]</p>
      <p>
        A Very Simple idea of using routes for code splitting. They would then
        simply contain the respective clients?
      </p> */}
    </div>
  )
}

class HomePage extends Component {
  render() {
    return <FullPage children={[HomePageInfo(), <PanelRouteContainer />]} />
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(HomePage)
