import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { ALL_USERS_QUERY } from "../../queries/allUsers"
import { Query } from "react-apollo"
import { Droppable, Draggable } from "react-beautiful-dnd"
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
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h1>A list of all the user orgs</h1>
              {allOrganisations &&
                allOrganisations.map((org, orgIdx) => {
                  return (
                    <Chip
                      key={orgIdx}
                      icon={<FaceIcon />}
                      label={org.name}
                      onDelete={() =>
                        console.log("Remove organisation from user")
                      }
                      className={classes.chip}
                      color="secondary"
                      variant="outlined"
                    />
                  )
                })}
            </div>
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
