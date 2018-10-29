import React, { Component, Fragment } from "react"
import ColorPicker from "material-ui-color-picker"

class ColorSettings extends Component {
  render() {
    return (
      <Fragment>
        <ColorPicker
          name="color"
          
          // defaultValue="#000"
          // currColor
          value={this.props.currColor}
          // defaultValue={this.props.currColor ? this.props.currColor : "#000"}
          onChange={color => this.props.changeColor(color)}
          // onChange={color => console.log("The color Change... ", color)}
        />
      </Fragment>
    )
  }
}

export default ColorSettings
