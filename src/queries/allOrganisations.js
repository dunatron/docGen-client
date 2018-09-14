import gql from "graphql-tag"

export const ALL_ORGANISATIONS_QUERY = gql`
  query {
    allOrganisations {
      id
      name
    }
  }
`
