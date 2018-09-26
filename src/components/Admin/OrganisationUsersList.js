import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { ALL_ORGANISATION_USERS } from "../../queries/allOrganisationUsers"
import { Query } from "react-apollo"

class OrganisationUsersList extends Component {
  _getQueryVariables = () => {
    const idFromPath = this.props.location.pathname.split("/")[2] // this is highly unstable, change asap

    const id = idFromPath

    return { id }
  }

  render() {
    return (
      <Query query={ALL_ORGANISATION_USERS}>
        {({ loading, error, data, subscribeToMore }) => {
          {
            console.log("THE DATA ", data)
          }
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log("users for the given org => ", data)

          const { organisation } = data
          const { users } = organisation

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {users &&
                users.map((user, userIdx) => {
                  return (
                    <div>
                      <h2>User Details </h2>
                      <div>ID: {user.id}</div>
                      <div>Name: {user.name}</div>

                      <div>Email: {user.email}</div>
                      <div>Role: {user.role}</div>
                    </div>
                  )
                })}
            </div>
          )
        }}
      </Query>
    )
  }
}

// export default compose(
//   //graphql(VOTE_MUTATION, { name: "upVoteMutation" }),
//   withApollo
// )(SingleDocumentContainer)

export default compose(
  withRouter,
  withApollo
)(OrganisationUsersList)
