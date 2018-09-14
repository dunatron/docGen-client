import React from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  textField: {},
})

const PagePercentage = ({ percentage, onChange, classes }) => {
  return (
    <div>
      This component will change a percentage... Probably convert to more
      generic. Set of Inputs withg onChange calling container
      <TextField
        type="number"
        id="pagePercentage"
        label="Zoom"
        className={classes.textField}
        value={percentage}
        onChange={e => onChange(e.target.value)}
        margin="normal"
      />
    </div>
  )
}

export default withStyles(styles)(PagePercentage)
