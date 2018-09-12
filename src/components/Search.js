import React, { Component } from "react"
import { withApollo } from "react-apollo"
import gql from "graphql-tag"
import Sample from "./Sample"

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      samples {
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

class Search extends Component {
  state = {
    samples: [],
    filter: "",
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.samples.map((sample, index) => (
          <Sample key={sample.id} sample={sample} index={index} />
        ))}
      </div>
    )
  }

  _executeSearch = async () => {
    const { filter } = this.state
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    })
    const samples = result.data.feed.samples
    this.setState({ samples })
  }
}

export default withApollo(Search)
