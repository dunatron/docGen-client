import gql from "graphql-tag"

export const POST_SECTION_MUTATION = gql`
  mutation PostMutation($type: String!, $docId: ID) {
    postSection(type: $type, belongsTo: $docId) {
      id
      type
      position
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
