import React, { Component, Fragment } from "react"
import Sample from "./Sample"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { AUTH_TOKEN, SAMPLES_PER_PAGE } from "../constants"
import { timeDifferenceForDate } from "../utils"

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: SampleOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      samples {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`

const NEW_SAMPLES_SUBSCRIPTION = gql`
  subscription {
    newSample {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      node {
        id
        sample {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`

class SampleList extends Component {
  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes("new")
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * SAMPLES_PER_PAGE : 0
    const first = isNewPage ? SAMPLES_PER_PAGE : 100
    const orderBy = isNewPage ? "createdAt_DESC" : null
    return { first, skip, orderBy }
  }

  _updateCacheAfterVote = (store, createVote, sampleId) => {
    const isNewPage = this.props.location.pathname.includes("new")
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * SAMPLES_PER_PAGE : 0
    const first = isNewPage ? SAMPLES_PER_PAGE : 100
    const orderBy = isNewPage ? "createdAt_DESC" : null
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy },
    })

    const votedSample = data.feed.samples.find(sample => sample.id === sampleId)
    votedSample.votes = createVote.sample.votes
    store.writeQuery({ query: FEED_QUERY, data })
  }

  _subscribeToNewSamples = subscribeToMore => {
    subscribeToMore({
      document: NEW_SAMPLES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newSample = subscriptionData.data.newSample.node

        return Object.assign({}, prev, {
          feed: {
            samples: [newSample, ...prev.feed.samples],
            count: prev.feed.samples.length + 1,
            __typename: prev.feed.__typename,
          },
        })
      },
    })
  }

  _subscribeToNewVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    })
  }

  _getSamplesToRender = data => {
    const isNewPage = this.props.location.pathname.includes("new")
    if (isNewPage) {
      return data.feed.samples
    }
    const rankedSamples = data.feed.samples.slice()
    rankedSamples.sort((l1, l2) => l2.votes.length - l1.votes.length)
    return rankedSamples
  }

  _nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page <= data.feed.count / SAMPLES_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/new/${nextPage}`)
    }
  }

  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/new/${previousPage}`)
    }
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewSamples(subscribeToMore)
          this._subscribeToNewVotes(subscribeToMore)

          const samplesToRender = this._getSamplesToRender(data)
          const isNewPage = this.props.location.pathname.includes("new")
          const pageIndex = this.props.match.params.page
            ? (this.props.match.params.page - 1) * SAMPLES_PER_PAGE
            : 0

          return (
            <Fragment>
              {samplesToRender.map((sample, index) => (
                <Sample
                  key={sample.id}
                  sample={sample}
                  index={index + pageIndex}
                  updateStoreAfterVote={this._updateCacheAfterVote}
                />
              ))}
              {isNewPage && (
                <div className="flex ml4 mv3 gray">
                  <div className="pointer mr2" onClick={this._previousPage}>
                    Previous
                  </div>
                  <div className="pointer" onClick={() => this._nextPage(data)}>
                    Next
                  </div>
                </div>
              )}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default SampleList
