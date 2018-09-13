import React, { Component } from "react"
import gql from "graphql-tag"
import { DOCUMENT_FEED_QUERY } from "../queries/documentFeedQuery"
import { DOCUMENTS_PER_PAGE } from "../constants"
import { withRouter } from "react-router"
import { Mutation, withApollo, compose } from "react-apollo/index"

const POST_MUTATION = gql`
  mutation PostMutation($name: String!) {
    postDocument(name: $name) {
      id
      name
      createdAt
      createdBy {
        email
        name
        id
      }
    }
  }
`

class CreateDocument extends Component {
  state = {
    name: "",
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A Name for the document"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ name }}
          onCompleted={() => this.props.history.push("/documents")}
          update={(store, { data: { postDocument } }) => {
            const first = DOCUMENTS_PER_PAGE
            const skip = 0
            const orderBy = "createdAt_DESC"
            const data = store.readQuery({
              query: DOCUMENT_FEED_QUERY,
              variables: { first, skip, orderBy },
            })
            data.documentFeed.unshift(postDocument)
            store.writeQuery({
              query: DOCUMENT_FEED_QUERY,
              data,
              variables: { first, skip, orderBy },
            })
          }}>
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

// export default withRouter(CreateDocument)

export default compose(
  withRouter,
  withApollo
)(CreateDocument)
