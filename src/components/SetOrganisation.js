import React, { Component, Fragment } from "react"
import { ORGANISATION_ID } from "../constants"
import { graphql, compose, withApollo, Query } from "react-apollo"
import gql from "graphql-tag"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
// Redux
import { connect } from "react-redux"
import { setUserOrg } from "../actions/userActions"
// components
import BasicPanel from "./BasicPanel"

// Queries
import { USER_ORGANISATIONS } from "../queries/getUserOrgs"

const styles = theme => ({
  container: {
    marginRight: "auto",
    marginLeft: "auto",
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
  _resetApolloStore = () => {
    const { client } = this.props
    client.resetStore()
  }

  _setOrganisation = orgId => {
    this._resetApolloStore()
    this.props.setUserOrg(orgId)
    this.props.history.goBack()
  }

  _renderOrganisations = () => {
    // REDUX orgId Note: localStorage is just going to work better for this.
    // const { user } = this.props
    // const { currOrgId } = user
    const currOrgId = localStorage.getItem(ORGANISATION_ID)
    return (
      <Query query={USER_ORGANISATIONS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          const { getUser } = data
          const { organisations } = getUser

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {organisations.length === 0 && (
                <div>
                  You have no Organisations. Please contact Nomos and we will
                  sort this for you
                </div>
              )}
              {organisations.map((org, orgIdx) => {
                const { id, name } = org
                return (
                  <BasicPanel
                    title={name}
                    btnTitle="Set Organisation"
                    active={currOrgId === org.id}
                    handleClick={() => this._setOrganisation(id)}
                  />
                )
              })}
            </div>
          )
        }}
      </Query>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>{this._renderOrganisations()}</div>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    setUserOrg: orgId => dispatch(setUserOrg(orgId)),
  })
)

export default withRouter(
  compose(
    withApollo,
    reduxWrapper,
    withStyles(styles)
  )(SetOrganisation)
)
