import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import faker from "faker"
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

class RichSection extends Component {
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
        <RichEditor
          document={rawContent ? rawContent.document : this._generateInitial()}
          updateDocument={document => this.update(document)}
        />
      </Fragment>
    )
  }

  _generateInitial = () => {
    const HEADINGS = 2
    const PARAGRAPHS = 5 // Paragraphs per heading
    const nodes = []
    const json = {
      document: { nodes },
    }

    for (let h = 0; h < HEADINGS; h++) {
      nodes.push({
        object: "block",
        type: "heading",
        // nodes: [{ object: "text", leaves: [{ text: faker.lorem.sentence() }] }],
        nodes: [
          {
            object: "text",
            leaves: [{ text: faker.lorem.sentence() }],
          },
        ],
      })

      for (let p = 0; p < PARAGRAPHS; p++) {
        nodes.push({
          object: "block",
          type: "paragraph",
          // nodes: [{ object: "text", leaves: [{ text: faker.lorem.paragraph() }] }],
          nodes: [
            {
              object: "text",
              leaves: [{ text: faker.lorem.paragraph() }],
            },
          ],
        })
      }
      return json
    }
  }
}

export default withStyles(styles)(RichSection)
