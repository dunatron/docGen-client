import React from "react"
import DataMark from "./DataMark"

const RenderMark = props => {
  switch (props.mark.type) {
    case "bold":
      return <strong {...props.attributes}>{props.children}</strong>
    // Add our new mark renderers...
    case "code":
      return <code>{props.children}</code>
    case "italic":
      return <em>{props.children}</em>
    case "strikethrough":
      return <del>{props.children}</del>
    case "underline":
      return <u>{props.children}</u>
    case "data":
      return <DataMark {...props} />
  }
}

export default RenderMark
