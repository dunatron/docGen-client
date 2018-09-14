import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
  searchField: {
    margin: theme.spacing.unit * 2,
  },
})

const TextInput = ({ id, label, classes, value, handleChange }) => {
  return (
    <TextField
      id={id}
      label={label}
      className={classes.searchField}
      value={value}
      onChange={e => handleChange(e.target.value)}
      margin="normal"
    />
  )
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(TextInput)
