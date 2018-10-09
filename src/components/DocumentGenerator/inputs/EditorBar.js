import React, { Component, Fragment } from "react"
class EditorBar extends Component {
  render() {
    const { history, redo, undo } = this.props
    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "black",
          color: "white",
          border: "2px solid red",
          top: -60,
          left: 0,
        }}>
        <div onMouseDown={undo}>
          <div>undo</div>
        </div>
        <div onMouseDown={redo}>
          <div>redo</div>
        </div>
        <span>Undos: {history.undos.size}</span>
        <span>Redos: {history.redos.size}</span>
      </div>
    )
  }
}

export default EditorBar
