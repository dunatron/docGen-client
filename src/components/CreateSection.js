import React, { Component } from "react"
import gql from "graphql-tag"
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
import { withRouter } from "react-router"
import { Mutation, withApollo, compose } from "react-apollo/index"
import { POST_SECTION_MUTATION } from "../mutations/postSection"

// Components
import TextInput from "./inputs/TextInput"

class CreateSection extends Component {
  state = {
    type: "",
  }

  _setOrganisation = val => {
    this.setState({
      orgId: val,
    })
  }

  render() {
    const { type } = this.state
    const { documentId } = this.props
    return (
      <div>
        <div className="flex flex-column mt3">
          <TextInput
            id="documentName"
            label="Document Name"
            value={type}
            handleChange={value => this.setState({ type: value })}
          />
        </div>

        <Mutation
          mutation={POST_SECTION_MUTATION}
          variables={{ type, docId: documentId }}
          update={(store, { data: { postSection } }) => {
            const data = store.readQuery({
              query: SINGLE_DOCUMENT_QUERY,
              variables: { id: documentId },
            })
            data.singleDocument.sections.unshift(postSection)
            store.writeQuery({
              query: SINGLE_DOCUMENT_QUERY,
              data,
              variables: { id: documentId },
            })
          }}>
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(CreateSection)
