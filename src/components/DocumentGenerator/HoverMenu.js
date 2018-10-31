import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import styled, { css } from "react-emotion"
import { withStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import CodeIcon from "@material-ui/icons/Code"

const StyledMenu = styled("div")`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 9000;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #004851;
  border-radius: 4px;
  transition: opacity 0.75s;
`

class HoverMenu extends React.Component {
  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { className, classes, innerRef } = this.props
    const root = window.document.getElementById("root")

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton("bold", <FormatBoldIcon color="secondary" />)}
        {this.renderMarkButton(
          "italic",
          <FormatItalicIcon color="secondary" />
        )}
        {this.renderMarkButton(
          "underline",
          <FormatUnderlinedIcon color="secondary" />
        )}
        {this.renderMarkButton("code", <CodeIcon color="secondary" />)}
      </StyledMenu>,
      root
    )

    // return ReactDOM.createPortal(
    //   <div className={classes.menu} innerRef={innerRef}>
    //     {this.renderMarkButton("bold", "format_bold")}
    //     {this.renderMarkButton("italic", "format_italic")}
    //     {this.renderMarkButton("underlined", "format_underlined")}
    //     {this.renderMarkButton("code", "code")}
    //   </div>,
    //   root
    // )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton(type, icon) {
    const { value, classes } = this.props
    const isActive = value.activeMarks.some(mark => mark.type == type)
    return (
      <IconButton
        reversed
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
        aria-label="Delete">
        {icon}
      </IconButton>
    )
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }
}

HoverMenu.propTypes = {
  // classes: PropTypes.object.isRequired,
}

export default HoverMenu
