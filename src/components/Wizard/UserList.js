import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { ALL_USERS_QUERY } from "../../queries/allUsers"
import { Query } from "react-apollo"
import { Droppable, Draggable } from "react-beautiful-dnd"
// Components
import UserCard from "./UserCard"
// Queries
import { ALL_ORGANISATION_USERS } from "../../queries/allOrganisationUsers"
// Mutations
import { CHANGE_USER_ROLE } from "../../mutations/changeUserRole"

class UserList extends Component {
  _changeUserRole = async (e, user) => {
    console.log("The user change role => ", e)
    console.log("checked ? => ", e.target.checked)
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
        },
      ],
    })
  }

  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log("users for the given org => ", data)

          const { allUsers } = data

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Fragment>
                <Droppable droppableId="userDragAndDrop" type="UserListCanvas">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        border: "1px solid rebeccapurple",
                        backgroundColor: snapshot.isDraggingOver
                          ? "blue"
                          : "grey",
                      }}
                      {...provided.droppableProps}>
                      <Draggable draggableId="test-user-draggable-1" index={0}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            {/* <Button
                              className={classes.button}
                              variant="raised"
                              color="primary"
                              type="submit"
                              onClick={e => alert("add drag n Drop")}>
                              H1
                            </Button> */}
                            <div>You can try dragging me around</div>
                          </div>
                        )}
                      </Draggable>

                      {allUsers.map((user, userIdx) => {
                        return (
                          <Draggable
                            draggableId={`draggable-user-${user.id}`}
                            index={userIdx}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <UserCard
                                  key={userIdx}
                                  user={user}
                                  handleRoleChange={e =>
                                    this._changeUserRole(e, user)
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        )
                      })}

                      {/* {allUsers.map((user, userIdx) => {
                        return (
                          <UserCard
                            key={userIdx}
                            user={user}
                            handleRoleChange={e =>
                              this._changeUserRole(e, user)
                            }
                          />
                        )
                      })} */}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Fragment>
              {/* {allUsers.map((user, userIdx) => {
                return (
                  <UserCard
                    key={userIdx}
                    user={user}
                    handleRoleChange={e => this._changeUserRole(e, user)}
                  />
                )
              })} */}
              {/* {allUsers.map((user, userIdx) => {
                return (
                  <div key={userIdx}>
                    <div>{user.id}</div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                    <div>
                      {user.organisations.map((org, orgIdx) => {
                        return (
                          <div>
                            <div>{org.id}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })} */}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  graphql(CHANGE_USER_ROLE, { name: "changeUserRole" }),
  withRouter,
  withApollo
)(UserList)
