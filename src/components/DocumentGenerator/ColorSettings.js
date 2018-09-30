import React, { Component, Fragment } from "react"
import ColorPicker from "material-ui-color-picker"

class ColorSettings extends Component {
  render() {
    return (
      <Fragment>
        <ColorPicker
          name="color"
          defaultValue="#000"
          onChange={color => this.props.changeColor(color)}
        />
      </Fragment>
    )
  }
}

export default ColorSettings
