import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
  searchField: {
    margin: theme.spacing.unit * 2,
  },
})

const NumberInput = ({
  id,
  label,
  classes,
  value,
  defaultValue,
  handleChange,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      className={classes.searchField}
      // value={value}
      defaultValue={defaultValue}
      // Ok for this to be superior as it relies on onChange update we must use a timeOut func.
      // This will become a class component. it will send its contained value after the user hasnt typed in it for a few seconds
      onChange={e => handleChange(e.target.value)}
      // onChange={handleChange}
      margin="normal"
    />
  )
}

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(NumberInput)
