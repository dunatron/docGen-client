import gql from "graphql-tag"

export const DOCUMENT_FEED_QUERY = gql`
  query {
    documentFeed {
      id
      name
      createdBy {
        id
        email
        name
      }
    }
  }
`
