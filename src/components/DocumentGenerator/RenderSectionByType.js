import React, { Component, Fragment } from "react"
// Rich Components
import RichH1 from "./richComponents/RichH1"
import RichParagraph from "./richComponents/RichParagraph"
import RichSection from "./richComponents/RichSection"
import RichColumns from "./richComponents/RichColumns"
import RichTable from "./richComponents/RichTable"
import ContainedTable from "./richComponents/ContainedTable"

const RenderSectionByType = props => {
  const { section, update, pageAttributes, focused } = props
  switch (section.type) {
    case "h1":
      return (
        <RichH1
          section={section}
          pageAttributes={pageAttributes}
          update={section => update(section)}
        />
      )
    case "p":
      return (
        <RichParagraph
          section={section}
          pageAttributes={pageAttributes}
          update={section => update(section)}
        />
      )
    case "richsection":
      return (
        <RichSection
          section={section}
          pageAttributes={pageAttributes}
          update={section => update(section)}
        />
      )
    case "columns":
      return (
        <RichColumns
          section={section}
          focused={focused}
          pageAttributes={pageAttributes}
          update={section => update(section)}
        />
      )
    case "table":
      return (
        <RichTable
          section={section}
          focused={focused}
          pageAttributes={pageAttributes}
          {...props}
          update={section => update(section)}
        />
      )
    case "contained-table":
      return (
        <ContainedTable
          section={section}
          focused={focused}
          pageAttributes={pageAttributes}
          // The props contains our delete actions
          {...props}
          update={section => update(section)}
        />
      )
    default:
      return null
  }
}

export default RenderSectionByType
