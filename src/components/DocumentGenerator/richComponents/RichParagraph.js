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

class RichParagraph extends Component {
  update = document => {
    const { classes, section } = this.props
    const { id, type, rawContent } = section
    const updatedSection = { id, type, rawContent: { document } }
    this.props.update(updatedSection)
  }
  render() {
    const { classes, section } = this.props
    const { id, type, rawContent } = section

    return (
      <Fragment>
        <Canvas
          document={rawContent ? rawContent.document : null}
          updateDocument={document => this.update(document)}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(RichParagraph)
