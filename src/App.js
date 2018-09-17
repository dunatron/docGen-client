import React, { Component } from "react"
import { AUTH_TOKEN } from "./constants"
import { Switch, Route, Redirect } from "react-router-dom"
import "./App.css"
import Login from "./components/Login"
import CreateDocument from "./components/CreateDocument"
import Search from "./components/Search"

// Menu
import AppBarContainer from "./containers/AppBarContainer"
// Pages
import HomePage from "./pages/HomePage"
import DocumentPage from "./pages/SingleDocument"
import DataPiperPage from "./pages/DataPiper"
// Rouge containers
import DocumentsListContainer from "./containers/DocumentsListContainer"

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    // This will actually need to check if it is valid or not
    // It was. I just created a user that had empty pass and email =/
    if (!authToken) {
      return (
        <div>
          <Login />
        </div>
      )
    }

    return (
      <div className="center w85">
        {/* <Header /> */}
        <AppBarContainer />
        <div className="ph3 pv1 background-gray">
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/new/1" />} /> */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/" component={DocumentPage} />
            <Route exact path="/datapiper" component={DataPiperPage} />
            <Route path="/document/:id" component={DocumentPage} />
            <Route exact path="/documents" component={DocumentsListContainer} />
            <Route exact path="/create" component={CreateDocument} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
