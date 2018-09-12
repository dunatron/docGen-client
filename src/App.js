import React, { Component } from "react"
import { AUTH_TOKEN } from "./constants"
import Header from "./components/Header"
import { Switch, Route, Redirect } from "react-router-dom"
import logo from "./logo.svg"
import "./App.css"
import Login from "./components/Login"
import SampleList from "./components/SampleList"
import CreateSample from "./components/CreateSample"
import SampleListContainer from "./containers/SampleListContainer"
import SuperTable from "./components/SuperTable"
import Search from "./components/Search"

// Menu
import AppBarContainer from "./containers/AppBarContainer"
// Pages
import HomePage from "./pages/HomePage"

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    // This will actually need to check if it is valid or not
    if (!authToken) {
      return (
        <div>
          THIS WILL HAVE A LOGIN PAGE
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
            <Route exact path="/table" component={SampleListContainer} />
            <Route exact path="/create" component={CreateSample} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/top" component={SampleList} />
            <Route exact path="/new/:page" component={SampleList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
