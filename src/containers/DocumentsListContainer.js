import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo } from "react-apollo"
import { DOCUMENT_FEED_QUERY } from "../queries/documentFeedQuery"
import { Query } from "react-apollo"
import DocumentPreview from "../components/DocumentPreview"

class DocumentsListContainer extends Component {
  // _subscribeToNewDocuments = subscribeToMore => {
  //   subscribeToMore({
  //     document: NEW_SAMPLES_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev
  //       const newSample = subscriptionData.data.newSample.node

  //       return Object.assign({}, prev, {
  //         feed: {
  //           samples: [newSample, ...prev.feed.samples],
  //           count: prev.feed.samples.length + 1,
  //           __typename: prev.feed.__typename,
  //         },
  //       })
  //     },
  //   })
  // }

  render() {
    return (
      <Query query={DOCUMENT_FEED_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          {
            console.log("THE DATA ", data)
          }
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const { documentFeed } = data

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {documentFeed.map((document, docIdx) => {
                return <DocumentPreview key={docIdx} document={document} />
              })}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  //graphql(VOTE_MUTATION, { name: "upVoteMutation" }),
  withApollo
)(DocumentsListContainer)
