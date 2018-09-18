import React, { Component } from "react"

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
 * The path thing will work well, path = path + new key continue
 */
export const listObjectValues = obj => {
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
            border: `${isObj ? "1px solid red" : "1px solid blue"}`,
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
