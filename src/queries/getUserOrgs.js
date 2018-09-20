import gql from "graphql-tag"

export const USER_ORGANISATIONS = gql`
  query {
    getUser {
      id
      name
      organisations {
        id
        name
      }
    }
  }
`
