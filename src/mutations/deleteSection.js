import gql from "graphql-tag"

export const DELETE_SECTION_MUTATION = gql`
  mutation deleteSection($sectionId: ID!) {
    deleteSection(sectionId: $sectionId) {
      id
    }
  }
`
