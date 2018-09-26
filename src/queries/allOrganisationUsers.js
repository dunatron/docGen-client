import gql from "graphql-tag"

export const ALL_ORGANISATION_USERS = gql`
  query {
    organisation {
      users {
        id
        name
        email
        role
      }
    }
  }
`
