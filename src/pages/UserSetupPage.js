import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, withApollo, compose } from "react-apollo/index"
import { withStyles } from "@material-ui/core/styles"
// page layout
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import FullPage from "../layouts/FullPage"
// components
import UserList from "../components/Wizard/UserList"
import OrgList from "../components/Wizard/OrgList"
// Mutations
import { ADD_ORG_TO_USER_MUTATION } from "../mutations/addOrgToUser"
import { REMOVE_ORG_FROM_USER_MUTATION } from "../mutations/removeOrgFromUser"
// Queries
import { ALL_ORGANISATION_USERS } from "../queries/allOrganisationUsers"

const styles = {}

class UserSetupPage extends Component {
  _addOrgToUser = async (orgId, userId) => {
    // alert(`add org ${orgId} to user ${userId}`)
    await this.props.addOrgToUser({
      variables: {
        orgId: orgId,
        userId: userId,
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

  _removeOrgFromUser = async (orgId, userId) => {
    // alert(`add org ${orgId} to user ${userId}`)
    await this.props.removeOrgFromUser({
      variables: {
        orgId: orgId,
        userId: userId,
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

  onDragEnd = result => {
    if (result.type === "ORG") {
      console.log("Add org to user through mutation ", result)
      try {
        const orgID = result.draggableId
        const userId = result.destination.droppableId
        this._addOrgToUser(orgID, userId)
        console.log("The OrgId => ", orgID)
        console.log("The UserId => ", userId)
      } catch (e) {
        // alert(`an error ${e}`)
      }
    }
  }

  onDragStart = () => {
    console.log("onDragStart start ")
  }
  render() {
    const userOrgSetup = (
      <div>
        <UserList
          removeOrgFromUser={(orgId, userId) =>
            this._removeOrgFromUser(orgId, userId)
          }
        />
        <OrgList />
      </div>
    )

    return (
      <Fragment>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}>
          <FullPage children={[userOrgSetup]} />
        </DragDropContext>
      </Fragment>
    )
  }
}

// export default HomePage

// export default compose(

//   withRouter,
//   withApollo
// )(UserSetupPage)
export default compose(
  graphql(ADD_ORG_TO_USER_MUTATION, { name: "addOrgToUser" }),
  graphql(REMOVE_ORG_FROM_USER_MUTATION, { name: "removeOrgFromUser" }),
  withStyles(styles),
  withRouter,
  withApollo
)(UserSetupPage)
