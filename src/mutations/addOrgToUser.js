import gql from "graphql-tag"

export const ADD_ORG_TO_USER_MUTATION = gql`
  mutation addOrgToUser($orgId: ID!, $userId: ID!) {
    addOrgToUser(orgId: $orgId, userId: $userId) {
      id
      email
      organisations {
        name
        id
      }
    }
  }
`
