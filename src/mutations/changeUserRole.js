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

// mutation {
//   changeUserRole(id:"cjmifpdq619100b771ap8gsg7", role: ADMIN) {
//     name
//     id
//     role
//   }
// }

/*
mutation {
  updateUser(data:{
    role: ADMIN
  }
  where:{
    id:"cjmifpdq619100b771ap8gsg7"
  }
  ) {
    id
    email
    role
    organisations {
      id
      name
    }
  }
}
*/
