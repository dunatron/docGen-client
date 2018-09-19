import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
})

/**
 * API: https://material-ui.com/api/button/
 */
const ActionButton = ({
  classes,
  variant = "outlined",
  color = "secondary",
  text,
  onClick,
  injectStyles,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      className={classes.button}
      onClick={onClick}
      style={{ ...injectStyles }}
      {...props}>
      {text}
    </Button>
  )
}

ActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ActionButton)
