import gql from "graphql-tag"

// ToDo: turn this into a fragment. i.e. organisations should be a query frag
export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      id
      name
      email
      role
      organisations {
        id
        name
      }
    }
  }
`
