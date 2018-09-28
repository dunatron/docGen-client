import gql from "graphql-tag"

export const UPDATE_SECTION_MUTATION = gql`
  mutation updateSection($rawContent: Json, $sectionId: ID!) {
    updateSection(rawContent: $rawContent, sectionId: $sectionId) {
      id
      type
      rawContent
      createdAt
      belongsTo {
        name
        id
      }
      createdBy {
        email
        name
        id
      }
    }
  }
`
