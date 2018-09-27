import gql from "graphql-tag"

export const REMOVE_ORG_FROM_USER_MUTATION = gql`
  mutation removeOrgFromUser($orgId: ID!, $userId: ID!) {
    removeOrgFromUser(orgId: $orgId, userId: $userId) {
      id
      email
      organisations {
        name
        id
      }
    }
  }
`
