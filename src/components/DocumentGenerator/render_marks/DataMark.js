import React, { Component } from "react"
/**
 * Ok what we want to do here is find a way where the editor can store some sort of attribute/
 *
 */
const conf = {
  heath: "TRON",
  dane: "RUMBLE",
}

function insertData(change) {
  change.insertText("data")
}

class DataMark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      originalText: this.props.text,
    }
  }
  insertData = (change, stuff) => {
    change.insertText(stuff)
  }

  render() {
    const {
      attributes,
      children,
      editor,
      mark,
      marks,
      node,
      offset,
      text,
    } = this.props

    const confKeys = Object.keys(conf)

    if (confKeys.includes(text)) {
      const valueText = conf[text]
      editor.change(this.insertData, valueText)
    }

    return (
      <strong
        data-attr-template-key={this.state.originalText}
        style={{ color: "green" }}>
        {children}
      </strong>
    )
  }
}

export default DataMark
