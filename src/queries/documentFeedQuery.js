import gql from "graphql-tag"

export const DOCUMENT_FEED_QUERY = gql`
  query {
    documentFeed {
      id
      name
      createdFor {
        name
      }
      createdBy {
        id
        email
        name
      }
    }
  }
`
