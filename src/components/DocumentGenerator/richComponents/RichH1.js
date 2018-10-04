import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
// Canvas
import Canvas from "../inputs/Canvas"
// https://codeburst.io/lets-build-a-customizable-rich-text-editor-with-slate-and-react-beefd5d441f2
// https://github.com/ianstormtaylor/slate/blob/master/examples/hovering-menu/index.js
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class RichH1 extends Component {
  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <h1>an h1 component</h1>
        <Canvas sIdx={this.props.sIdx} document={this.props.document} />
      </Fragment>
    )
  }
}

export default withStyles(styles)(RichH1)
