import React, { Component, Fragment } from "react"
import { ORGANISATION_ID } from "../constants"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "react-apollo/index"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
// Redux
import { connect } from "react-redux"
import { setUserOrg } from "../actions/userActions"

// Queries
import { USER_ORGANISATIONS } from "../queries/getUserOrgs"

const styles = theme => ({
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "320px",
    padding: `${theme.spacing.unit * 3}px`,
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    color: theme.palette.primary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
})
class SetOrganisation extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: "",
  }

  _setOrganisation = orgId => {
    this.props.setUserOrg(orgId)
    // localStorage.setItem(ORGANISATION_ID, orgId)
    this.props.history.push(`/`)
  }

  _renderOrganisations = () => {
    return (
      <Query query={USER_ORGANISATIONS}>
        {({ loading, error, data }) => {
          {
            console.log("THE DATA ", data)
          }
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log("Data for a single Docuemnt => ", data)

          const { getUser } = data
          const { organisations } = getUser

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h1>SET AN ORG PLEASE</h1>
              {organisations.map((org, orgIdx) => {
                return (
                  <div onClick={() => this._setOrganisation(org.id)}>
                    <h1>AN ORGANISATION</h1>
                    <h2>ID: {org.id}</h2>
                    <h2>Name: {org.name}</h2>
                  </div>
                )
              })}
              {/* <SelectOption
                options={templateOptions}
                value={selectedTemplate}
                handleChange={template => this.changeTemplate(template)}
              /> */}
            </div>
          )
        }}
      </Query>
    )
  }

  render() {
    const { login, email, password, name } = this.state
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <h1>This is where we will Set the Organisation</h1>
        <p>
          A user can belong to many organisations but can only cat for 1
          organisation at a time
        </p>
        <p>
          This component will always be loaded on entry. It will get the users
          organisations.
        </p>
        <p>
          If there is only 1 organisation, it will automatically set this as the
          org and continue loading the rest of the app
        </p>
        {this._renderOrganisations()}
      </div>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    user: state.docY,
  }),
  dispatch => ({
    setUserOrg: orgId => dispatch(setUserOrg(orgId)),
  })
)

export default withRouter(
  compose(
    reduxWrapper,
    withStyles(styles)
  )(SetOrganisation)
)
