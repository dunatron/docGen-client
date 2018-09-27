import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { ALL_USERS_QUERY } from "../../queries/allUsers"
import { Query } from "react-apollo"
import { Droppable, Draggable } from "react-beautiful-dnd"
import ControlledDraggable from "react-draggable" // Both at the same time
// import Draggable from "react-draggable" // Both at the same time
import { withStyles } from "@material-ui/core/styles"
// Components
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
// Queries
import { ALL_ORGANISATIONS_QUERY } from "../../queries/allOrganisations"
// Mutations

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

class OrgList extends Component {
  render() {
    const { classes } = this.props
    return (
      <Query query={ALL_ORGANISATIONS_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log("all orgs => ", data)
          const { allOrganisations } = data

          return (
            <Fragment>
              <ControlledDraggable handle="strong">
                <div
                  style={{
                    position: "fixed",
                    top: "69px",
                    right: 0,
                    display: "fixed",
                    flexWrap: "wrap",
                  }}>
                  <Droppable droppableId="all-orgs-canvas" type="ORG">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "blue"
                            : "grey",
                        }}
                        {...provided.droppableProps}>
                        <strong className="cursor">
                          <div>Drag Handle</div>
                        </strong>
                        {allOrganisations &&
                          allOrganisations.map((org, orgIdx) => {
                            return (
                              <Draggable
                                draggableId={org.id}
                                index={0}
                                type="ORG">
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <Chip
                                      key={orgIdx}
                                      icon={<FaceIcon />}
                                      label={org.name}
                                      onDelete={() =>
                                        console.log(
                                          "Remove organisation from user"
                                        )
                                      }
                                      className={classes.chip}
                                      color="secondary"
                                      variant="outlined"
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </ControlledDraggable>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  // graphql(CHANGE_USER_ROLE, { name: "changeUserRole" }),
  withStyles(styles),
  withRouter,
  withApollo
)(OrgList)
