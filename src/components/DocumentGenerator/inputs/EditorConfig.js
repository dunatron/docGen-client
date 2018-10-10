import React from "react"

// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "quote",
  pre: "code",
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
  data: "data",
}
export const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            className: el.getAttribute("class"),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>
          case "quote":
            return <blockquote>{children}</blockquote>
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>
          case "italic":
            return <em>{children}</em>
          case "underline":
            return <u>{children}</u>
        }
      }
    },
  },
]

function insertData(change) {
  change.toggleMark("data")
}

function MarkHotkey(options) {
  const { type, key } = options
  console.log("Mark A Hot Key ", options)
  return {
    onKeyDown(event, change) {
      console.log("Hmmmm Plugins being hit?", type)
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key != key) return
      // Prevent the default characters from being inserted.
      event.preventDefault()
      // Toggle the mark `type`.
      if (type === "data") {
        change.call(insertData)
        // change.collapseToEnd()
        return true
      }
      change.toggleMark(type)

      return true
    },
  }
}

// Initialize our bold-mark-adding plugin.
const boldPlugin = MarkHotkey({
  type: "bold",
  key: "b",
})
const dataPlugin = MarkHotkey({
  type: "data",
  key: "d",
})
// Create an array of plugins.
export const plugins = [
  // MarkHotkey({ key: "b", type: "bold" }),
  boldPlugin,
  dataPlugin,
  MarkHotkey({ key: "`", type: "code" }),
  MarkHotkey({ key: "i", type: "italic" }),
  // MarkHotkey({ key: "~", type: "strikethrough" }),
  MarkHotkey({ key: "-", type: "strikethrough" }),
  MarkHotkey({ key: "u", type: "underline" }),
]
