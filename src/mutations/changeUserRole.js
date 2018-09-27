import gql from "graphql-tag"

export const CHANGE_USER_ROLE = gql`
  mutation changeUserRole($id: ID!, $role: ROLE!) {
    changeUserRole(id: $id, role: $role) {
      name
      id
      role
    }
  }
`
