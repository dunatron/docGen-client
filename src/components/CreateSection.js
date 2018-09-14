import React, { Component } from "react"
import gql from "graphql-tag"
import { DOCUMENT_FEED_QUERY } from "../queries/documentFeedQuery"
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
import { DOCUMENTS_PER_PAGE } from "../constants"
import { withRouter } from "react-router"
import { Query, Mutation, withApollo, compose } from "react-apollo/index"

// Components
import TextInput from "./inputs/TextInput"
import SelectOption from "./inputs/SelectOption"

const POST_SECTION_MUTATION = gql`
  mutation PostMutation($type: String!, $docId: ID) {
    postSection(type: $type, belongsTo: $docId) {
      id
      type
      rawContent
      createdAt
      belongsTo {
        name
        id
      }
      createdBy {
        email
        name
        id
      }
    }
  }
`

class CreateSection extends Component {
  state = {
    type: "",
  }

  _setOrganisation = val => {
    console.log("Tryng to set org ", val)
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
          // onCompleted={() => this.props.history.push("/documents")}
          update={(store, { data: { postSection } }) => {
            console.log(
              "Here is the data after posting a section => ",
              postSection
            )

            // const first = DOCUMENTS_PER_PAGE
            // const skip = 0
            // const orderBy = "createdAt_DESC"
            const data = store.readQuery({
              query: SINGLE_DOCUMENT_QUERY,
              variables: { id: documentId },
            })

            data.singleDocument.sections.unshift(postSection)

            console.log("Document from store before => ", data)
            // document.singleDocument.sections.unshift(postSection)
            console.log("Document from store after => ", data)
            store.writeQuery({
              query: SINGLE_DOCUMENT_QUERY,
              data,
              variables: { id: documentId },
            })
            // data.documentFeed.unshift(postDocument)
            // store.writeQuery({
            //   query: DOCUMENT_FEED_QUERY,
            //   data,
            //   variables: { first, skip, orderBy },
            // })
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
