import gql from "graphql-tag"

export const SINGLE_DOCUMENT_QUERY = gql`
  query getSingleDocument($id: ID!) {
    singleDocument(id: $id) {
      id
      name
      sections {
        id
        name
      }
    }
  }
`
