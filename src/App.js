import React, { Component } from "react"
import { AUTH_TOKEN, ORGANISATION_ID } from "./constants"
import { Switch, Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { connect } from "react-redux"
import "./App.css"

import CreateDocument from "./components/CreateDocument"
import Search from "./components/Search"

// components always loaded
import Login from "./components/Login"
import SetOrganisation from "./components/SetOrganisation"

// Menu
import AppBarContainer from "./containers/AppBarContainer"
// Pages

import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import WizardsPage from "./pages/WizardsPage"
import DocumentPage from "./pages/SingleDocument"
import DocYPage from "./pages/DocYPage"
import DocGenPage from "./pages/DocGenPage"
import Version5Page from "./pages/Version5Page"
import CreateDataConfigPage from "./pages/CreateDataConfigPage"
import OrganisationDataConfigsPage from "./pages/OrganisationDataConfigsPage"
// Admin Pages
import OrganisationUsersPage from "./pages/OrganisationUsersPage"
// Wizard Pages
import UserSetupPage from "./pages/UserSetupPage"
// Rouge containers
import DocumentsListContainer from "./containers/DocumentsListContainer"

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const orgId = localStorage.getItem(ORGANISATION_ID)
    // const { user } = this.props
    // const { currOrgId } = user
    const { history } = this.props
    const { pathname } = history.location

    // This will actually need to check if it is valid or not
    // It was. I just created a user that had empty pass and email =/
    if (!authToken) {
      return (
        <div>
          <Login />
        </div>
      )
    }

    // localStorage works best.
    if (!orgId && pathname !== "/setorg") {
      this.props.history.push("/setorg")
      // return (
      //   <div>
      //     <SetOrganisation />
      //   </div>
      // )
    }

    // if (!currOrgId) {
    //   return (
    //     <div>
    //       <SetOrganisation />
    //     </div>
    //   )
    // }

    return (
      <div className="center w85">
        {/* <Header /> */}
        <AppBarContainer />
        <div className="ph3 pv1 background-gray">
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/new/1" />} /> */}

            <Route exact path="/" component={HomePage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/wizard" component={WizardsPage} />

            <Route exact path="/setorg" component={SetOrganisation} />

            <Route exact path="/docgen" component={DocGenPage} />
            {/* { Below we could use orgId in between /organisation/:id/dataconfigs could store orgId in redux store. When user logs in they choose an org to work for that they are asscoiated with } */}
            <Route
              exact
              path="/organisation/dataconfigs"
              component={OrganisationDataConfigsPage}
            />

            <Route exact path="/v5" component={Version5Page} />
            <Route exact path="/docy" component={DocYPage} />
            <Route
              exact
              path="/create/dataconf"
              component={CreateDataConfigPage}
            />
            <Route path="/document/:id" component={DocumentPage} />
            <Route exact path="/documents" component={DocumentsListContainer} />
            <Route exact path="/create/document" component={CreateDocument} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            {/* { ADMIN ROUTES} */}
            <Route
              exact
              path="/admin/users"
              component={OrganisationUsersPage}
            />

            {/* { ADMIN ROUTES} */}

            <Route exact path="/wizard/usersetup" component={UserSetupPage} />
          </Switch>
        </div>
      </div>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)

// export default App

export default withRouter(App)

// This breaks the routing
// export default reduxWrapper(App)

// export default compose(reduxWrapper)(App)
