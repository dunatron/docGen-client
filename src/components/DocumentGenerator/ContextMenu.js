import React from "react"
import ReactDOM from "react-dom"
const modalRoot = document.getElementById("context-menu-root")

class ContextMenu extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    // return ReactDOM.createPortal(this.props.children, this.el)
    const { innerRef } = this.props
    return ReactDOM.createPortal(
      <div style={{ left: 0 }} innerRef={innerRef}>
        <div>I want te be part of the contetx Menu</div>
        <div>I want te be part of the contetx Menu</div>
        <div>I want te be part of the contetx Menu</div>
      </div>,
      this.el
    )
  }
}

export default ContextMenu
