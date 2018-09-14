import gql from "graphql-tag"

export const SINGLE_DOCUMENT_QUERY = gql`
  query getSingleDocumet($id: ID!) {
    singleDocument(id: $id) {
      name
      id
      createdAt
      createdBy {
        id
        name
      }
      createdFor {
        id
        name
      }
      sections {
        id
        name
      }
    }
  }
`
