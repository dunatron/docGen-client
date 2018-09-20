import gql from "graphql-tag"

export const ORG_DATA_CONFIGS = gql`
  query getOrgDataConfigs($orgId: ID!) {
    orgDataConfigs(orgId: $orgId) {
      id
      name
    }
  }
`
