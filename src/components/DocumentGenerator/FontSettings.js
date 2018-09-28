import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({})

class FontSettings extends Component {
  render() {
    const { classes, attr } = this.props
    return (
      <div>
        <p>I am some font settings</p>
        <p>FontSize is: {attr.fontSize}</p>
        <TextField
          color="secondary"
          id="filled-name"
          label="Name"
          className={classes.textField}
          value={attr.fontSize}
          onChange={() => console.log("Handle the change please")}
          margin="normal"
          variant="filled"
        />
      </div>
    )
  }
}
export default withStyles(styles)(FontSettings)
// export default RenderSection

// export default compose(
//   graphql(UPDATE_SECTION_MUTATION, { name: "updateSection" }),
//   withApollo
// )(RenderSection)
