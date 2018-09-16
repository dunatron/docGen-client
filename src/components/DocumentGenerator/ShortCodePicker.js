import React, { Component, Fragment } from "react"
import { Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"
import { isArray, isObject } from "../../utils/checkType"

const styles = theme => ({
  input: {
    fontSize: "36px",
    width: "100%",
  },
})

const _renderShortCode = shortCode => {
  if (isObject(shortCode)) {
    return <div>{}</div>
  }
}
const listNestedValues = obj => {
  const nestedType = Object.prototype.toString.call(obj)
  switch (nestedType) {
    case "[object Object]": {
      return listObjectValues(obj)
    }
    case "[object Array]": {
      return listArrayValues(obj)
    }
    default: {
      return listObjectValues(obj)
    }
  }
}

/**
 *
 * The path thng will work well, path = path + new key continue
 */
const listObjectValues = obj => {
  return Object.entries(obj).map(([key, val], idx) => {
    const isObj = typeof val === "object"
    return (
      // <div style={{ paddingLeft: "15px" }}>
      <div>
        {/* {isObj ? "It is an object" : "Nope value to add"} */}
        {/* You will need to check if it has avalue, that means it can be added. if its an object or an array then it is a no */}
        <span
          style={{
            paddingRight: "5px",
            border: `${isObj ? "none" : "1px solid blue"}`,
          }}>
          {key}
        </span>
        <span>{typeof val === "object" ? listNestedValues(val) : val}</span>
      </div>
    )
  })
}
const listArrayValues = arr => {
  return arr.map((val, idx) => {
    return (
      <div style={{ paddingLeft: "15px", border: "1px solid green" }}>
        <span>{idx + 1}</span>
        <span>{typeof val === "object" ? listNestedValues(val) : val}</span>
      </div>
    )
  })
}
const renderSummaryValues = fieldValue => {
  const fieldType = typeof fieldValue
  switch (fieldType) {
    case "object": {
      return listNestedValues(fieldValue)
    }
    case "boolean": {
      if (fieldValue === true) {
        return "Yes" // use intl
      }
      if (fieldValue === false) {
        return "No"
      }
      break
    }
    default: {
      return fieldValue
    }
  }
}

class ShortCodePicker extends Component {
  render() {
    const { shortCodes } = this.props

    return (
      <div>
        <h2>Short Codes</h2>

        <ul>
          {shortCodes.map(shortCode => {
            console.log("a short code object ", shortCode)
            return (
              <div>
                {/* {_renderShortCode(shortCode)} */}
                {renderSummaryValues(shortCode)}
              </div>
            )
          })}
          Map over all the object keys and arrays
          {JSON.stringify(shortCodes)}
        </ul>
      </div>
    )
  }
}
export default withStyles(styles)(ShortCodePicker)
