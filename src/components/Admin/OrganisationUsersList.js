import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { ALL_ORGANISATION_USERS } from "../../queries/allOrganisationUsers"
import { Query } from "react-apollo"
// Components
import UserCard from "./UserCard"
// Mutations
import { CHANGE_USER_ROLE } from "../../mutations/changeUserRole"

class OrganisationUsersList extends Component {
  _getQueryVariables = () => {
    const idFromPath = this.props.location.pathname.split("/")[2] // this is highly unstable, change asap

    const id = idFromPath

    return { id }
  }

  _changeUserRole = async (e, user) => {
    //1. if false change the role to GUEST
    //2. if true change the role to ADMIN
    let newRole
    if (e.target.checked === true) {
      newRole = "ADMIN"
    } else {
      newRole = "USER"
    }

    await this.props.changeUserRole({
      variables: {
        id: user.id,
        role: newRole,
      },
      refetchQueries: [
        {
          query: ALL_ORGANISATION_USERS,
          // variables: {
          //   ID: MethodID,
          // },
        },
      ],
    })
  }

  render() {
    return (
      <Query query={ALL_ORGANISATION_USERS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const { organisation } = data
          const { users } = organisation

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {users &&
                users.map((user, userIdx) => {
                  return (
                    <UserCard
                      user={user}
                      handleRoleChange={e => this._changeUserRole(e, user)}
                    />
                  )
                  // return (
                  //   <div>
                  //     <h2>User Details </h2>
                  //     <div>ID: {user.id}</div>
                  //     <div>Name: {user.name}</div>

                  //     <div>Email: {user.email}</div>
                  //     <div>Role: {user.role}</div>
                  //   </div>
                  // )
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
  graphql(CHANGE_USER_ROLE, { name: "changeUserRole" }),
  withRouter,
  withApollo
)(OrganisationUsersList)
