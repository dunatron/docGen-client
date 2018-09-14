import React, { Component } from "react"
import gql from "graphql-tag"
import { DOCUMENT_FEED_QUERY } from "../queries/documentFeedQuery"
import { DOCUMENTS_PER_PAGE } from "../constants"
import { withRouter } from "react-router"
import { Query, Mutation, withApollo, compose } from "react-apollo/index"

// Queries
import { ALL_ORGANISATIONS_QUERY } from "../queries/allOrganisations"
// Components
import TextInput from "./inputs/TextInput"
import SelectOption from "./inputs/SelectOption"

const POST_MUTATION = gql`
  mutation PostMutation($name: String!, $orgId: ID) {
    postDocument(name: $name, orgId: $orgId) {
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
    orgId: "",
  }

  _setOrganisation = val => {
    console.log("Tryng to set org ", val)
    this.setState({
      orgId: val,
    })
  }

  render() {
    const { name, orgId } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          {/* <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A Name for the document"
          /> */}
          <TextInput
            id="documentName"
            label="Document Name"
            value={name}
            handleChange={value => this.setState({ name: value })}
          />
        </div>

        <Query query={ALL_ORGANISATIONS_QUERY}>
          {({ loading, error, data, subscribeToMore }) => {
            {
              console.log("THE DATA ", data)
            }
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            console.log("ORGANISATIONS => ", data)

            const { allOrganisations } = data

            return (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div>Here we render a select field for the organisations</div>
                {orgId}
                {allOrganisations && (
                  <SelectOption
                    value={orgId}
                    handleChange={val => this._setOrganisation(val)}
                    options={allOrganisations.map(org => {
                      return {
                        name: org.name,
                        value: org.id,
                      }
                    })}
                  />
                )}
              </div>
            )
          }}
        </Query>

        <Mutation
          mutation={POST_MUTATION}
          variables={{ name, orgId }}
          onCompleted={() => this.props.history.push("/documents")}
          update={(store, { data: { postDocument } }) => {
            const first = DOCUMENTS_PER_PAGE
            const skip = 0
            const orderBy = "createdAt_DESC"
            const data = store.readQuery({
              query: DOCUMENT_FEED_QUERY,
              variables: { first, skip, orderBy },
            })
            console.log("Documents Before ", data)
            data.documentFeed.unshift(postDocument)
            console.log("Documents After ", data)
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
