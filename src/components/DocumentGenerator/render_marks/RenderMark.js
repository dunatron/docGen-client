import React from "react"

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
  }
}

export default RenderMark
