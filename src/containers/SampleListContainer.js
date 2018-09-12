import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo } from "react-apollo"
import { connect } from "react-redux"
import Sample from "../components/Sample"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { AUTH_TOKEN, SAMPLES_PER_PAGE } from "../constants"
import { timeDifferenceForDate } from "../utils"
import SuperTable from "../components/SuperTable"
import { VOTE_MUTATION } from "../components/Sample"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import ThumbUpSharpIcon from "@material-ui/icons/ThumbUpSharp"
import DialogPopup from "../components/DialogPopup"
import SnackBar from "../components/SnackBar"

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

// const HomeIcon = props => {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   )
// }

const COLUMN_HEADERS = [
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "description",
    show: true,
    tableRenderKey: "th",
  },
  {
    id: "url",
    numeric: false,
    disablePadding: true,
    label: "url",
    show: true,
    tableRenderKey: "th",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "created at ",
    show: true,
    tableRenderKey: "th",
  },
  // {
  //   id: "postedBy",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "posted by",
  //   show: true,
  //   type: "object",
  //   tableRenderKey: "th",
  // },

  {
    id: "postedBy",
    numeric: false,
    disablePadding: true,
    label: "posted by",
    show: true,
    type: "deep",
    found: "postedBy.name",
    tableRenderKey: "th",
  },

  {
    id: "votes", //votes.id
    numeric: false,
    disablePadding: true,
    label: "Votes ",
    show: true,
    type: "numberOfObj",
    found: "votes",
    tableRenderKey: "th",
  },

  {
    id: "upVote", //votes.id
    numeric: false,
    disablePadding: true,
    label: "Upvote ",
    show: false,
    type: "btnFunc",
    icon: (
      <IconButton color="primary" aria-label="Add to shopping cart">
        <ThumbUpSharpIcon />
      </IconButton>
    ),
    funcName: "upVote",
    found: "votes",
    tableRenderKey: "th",
  },

  // { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  // { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
]

class SampleListContainer extends Component {
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

  executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case "testFunc":
        this.testFunc()
        break
      case "helloWorld":
        this.helloWorld()
      case "upVote":
        this.upVote(dataObj.id)
        break
    }
  }

  testFunc = () => {
    console.log("GOD LIKE")
  }

  helloWorld = () => {
    alert("HELLO WORLD!")
  }

  upVote = async id => {
    try {
      const upVoteData = await this.props.upVoteMutation({
        variables: {
          sampleId: id,
        },
      })
    } catch (e) {
      // return <SnackBar message="PLEASE" />
      alert(e)
    }

    // console.log("upVoteData ", upVoteData)

    // if (upVoteData.errors) {
    //   upVoteData.errors.map((error, idx) => {
    //     alert(error.message)
    //     return <SnackBar message="PLEASE" />
    //   })
    // }

    // console.log("upVoteData ", upVoteData)

    //return
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewSamples(subscribeToMore)
          this._subscribeToNewVotes(subscribeToMore)

          console.log("Here is data ", data)

          const samplesToRender = this._getSamplesToRender(data)
          const isNewPage = this.props.location.pathname.includes("new")
          const pageIndex = this.props.match.params.page
            ? (this.props.match.params.page - 1) * SAMPLES_PER_PAGE
            : 0
          return (
            <Fragment>
              <Icon>add_circle</Icon>
              <IconButton color="primary" aria-label="Add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
              <DialogPopup
                header="Event Image"
                content="Please upload your event image by dragging it into the draggable area
or by clicking the draggable area and choosing your image"
              />
              {/* <SnackBar /> */}
              <SuperTable
                columnHeaders={COLUMN_HEADERS}
                title="Table of Code Samples"
                data={samplesToRender}
                executeFunc={(funcName, obj) => {
                  this.executeFunctionByName(funcName, obj)
                }}
              />
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

// export default SampleListContainer

const UP_VOTE_SAMPLE_MUTATION = gql`
  mutation addEventImage($eventID: ID!, $imgSrc: String!) {
    addEventImage(eventID: $eventID, imgSrc: $imgSrc) {
      Title
      EventImages {
        edges {
          node {
            ID
          }
        }
      }
    }
  }
`

export default compose(
  graphql(VOTE_MUTATION, { name: "upVoteMutation" }),
  withApollo
)(SampleListContainer)
