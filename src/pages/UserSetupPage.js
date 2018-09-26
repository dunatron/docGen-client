import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import FullPage from "../layouts/FullPage"
// components
import UserList from "../components/Wizard/UserList"

const setupInfo = () => {
  return (
    <div>
      <div>I will be a list of all the users</div>
      <p>Now this is where it is going to get cool 😎</p>
      <p>
        We will create drag and drop contexts which will contain for a start two
        contexts
      </p>
      <ul>
        <li>Users</li>
        <li>Organisations</li>
      </ul>
      <p>
        When You drag an Org onto a User it will take the org id that you
        dragged and the user id it was dragged onto and ensure they have been
        asscoiated
      </p>
    </div>
  )
}

class UserSetupPage extends Component {
  onDragEnd = result => {
    console.log("onDragEnd Finished ", result)
    // if (result.type === "DocumentCanvas") {
    //   console.log("attempting to add new theng to canvas")
    //   let docComps = this.state.documentComponents
    //   docComps.push({ type: "h1", content: "an h1 font component" })
    //   this.setState({
    //     documentComponents: docComps,
    //   })
    // }
  }

  onDragStart = () => {
    console.log("onDragStart start ")
  }
  render() {
    return (
      <Fragment>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}>
          <FullPage
            children={[
              <div>Big page of components to do a bunch of mutations on</div>,
              setupInfo(),
              <UserList />,
            ]}
          />
        </DragDropContext>
      </Fragment>
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(UserSetupPage)
