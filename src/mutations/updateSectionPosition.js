import gql from "graphql-tag"

export const UPDATE_SECTION_POSITION = gql`
  mutation updateSectionPosition($position: Int, $sectionId: ID!) {
    updateSectionPosition(position: $position, sectionId: $sectionId) {
      id
      position
    }
  }
`
