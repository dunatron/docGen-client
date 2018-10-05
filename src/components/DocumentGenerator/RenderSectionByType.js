import React, { Component, Fragment } from "react"
// Rich Components
import RichH1 from "./richComponents/RichH1"
import RichP from "./richComponents/RichP"
import RichParagraph from "./richComponents/RichParagraph"

const RenderSectionByType = props => {
  const { section, update } = props
  switch (section.type) {
    case "h1":
      return (
        <RichParagraph section={section} update={section => update(section)} />
      )
    case "p":
      return (
        <RichParagraph section={section} update={section => update(section)} />
      )
    default:
      return null
  }
}

export default RenderSectionByType
