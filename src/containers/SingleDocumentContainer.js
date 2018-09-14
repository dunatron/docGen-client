import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
import { Query } from "react-apollo"
import DocumentGenerator from "./DocumentGenerator"

class SingleDocumentContainer extends Component {
  _getQueryVariables = () => {
    const idFromPath = this.props.location.pathname.split("/")[2] // this is highly unstable, change asap

    const id = idFromPath

    return { id }
  }

  render() {
    return (
      <Query
        query={SINGLE_DOCUMENT_QUERY}
        variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          {
            console.log("THE DATA ", data)
          }
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log("Data for a single Docuemnt => ", data)

          const { singleDocument } = data
          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <DocumentGenerator document={singleDocument} />
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
)(SingleDocumentContainer)
