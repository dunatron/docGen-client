import React, { Component } from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { AUTH_TOKEN } from "../constants"
import { timeDifferenceForDate } from "../utils"

export const VOTE_MUTATION = gql`
  mutation VoteMutation($sampleId: ID!) {
    vote(sampleId: $sampleId) {
      id
      sample {
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
`

class Sample extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ sampleId: this.props.sample.id }}
              update={(store, { data: { vote } }) =>
                this.props.updateStoreAfterVote(
                  store,
                  vote,
                  this.props.sample.id
                )
              }>
              {voteMutation => (
                <div className="ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.sample.description} ({this.props.sample.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.sample.votes.length} votes | by{" "}
            {this.props.sample.postedBy
              ? this.props.sample.postedBy.name
              : "Unknown"}{" "}
            {timeDifferenceForDate(this.props.sample.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}

export default Sample
