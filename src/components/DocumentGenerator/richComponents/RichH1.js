import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
// RichEditor
import RichEditor from "../inputs/RichEditor"

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
    const { classes, section, pageAttributes } = this.props
    const { id, type, rawContent } = section

    return (
      <Fragment>
        <RichEditor
          pageAttributes={pageAttributes}
          document={rawContent ? rawContent.document : this._generateInitial()}
          updateDocument={document => this.update(document)}
        />
      </Fragment>
    )
  }

  _generateInitial = () => {
    const nodes = [
      {
        object: "block",
        type: "heading",
        // nodes: [{ object: "text", leaves: [{ text: faker.lorem.paragraph() }] }],
        nodes: [
          {
            object: "text",
            leaves: [{ text: "A new heading" }],
          },
        ],
      },
    ]
    const json = {
      document: { nodes },
    }
    return json
  }
}

export default withStyles(styles)(RichParagraph)
