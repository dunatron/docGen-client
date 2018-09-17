import React, { Component, Fragment } from "react"
import classNames from "classnames"

// import * as docx from "docx"

import {
  Paragraph,
  TextRun,
  Packer,
  addParagraph,
  addRun,
  Document,
} from "docx"
import { saveAs } from "file-saver/FileSaver"

let docx = require("docx")
const cheerio = require("cheerio")

const availableStyles = [
  { tag: "h1", style: "heading1" },
  { tag: "h2", style: "heading2" },
  { tag: "h3", style: "heading3" },
  { tag: "h4", style: "heading4" },
  { tag: "h5", style: "heading5" },
  { tag: "h6", style: "heading6" },
]

const create = html => {
  const doc = new docx.Document()

  doc.Styles.createParagraphStyle("Heading1", "Heading 1")
    .color("000000")
    .bold()
    .size(64)
  doc.Styles.createParagraphStyle("Heading2", "Heading 2")
    .color("000000")
    .bold()
    .size(48)
  doc.Styles.createParagraphStyle("Heading3", "Heading 3")
    .color("000000")
    .bold()
    .size(42)
  doc.Styles.createParagraphStyle("Heading4", "Heading 4")
    .color("000000")
    .bold()
    .size(32)
  doc.Styles.createParagraphStyle("Heading5", "Heading 5")
    .color("000000")
    .bold()
    .size(26)
  doc.Styles.createParagraphStyle("Heading6", "Heading 6")
    .color("000000")
    .bold()
    .size(22)

  const json = html2json(html)
  json.forEach(element => {
    const paragraph = doc.createParagraph(element.text)
    const style = availableStyles.find(style => style.tag === element.tag)
    if (style) paragraph[style.style]()
  })

  // const packer = new docx.StreamPacker(doc)

  const packer = new Packer()

  packer.toBlob(doc).then(blob => {
    console.log(blob)
    saveAs(blob, "example.docx")
    console.log("Document created successfully")
  })

  //   return new Promise((resolve, reject) => {
  //     const buffers = []
  //     packer
  //       .pack()
  //       .on("data", data => buffers.push(data))
  //       .on("end", () => resolve(Buffer.concat(buffers)))
  //       .on("error", err => reject(err))
  //   })
}

const html2json = (html, json, parent) => {
  if (!json) json = []
  const $ = cheerio.load(html)
  $("body")
    .contents()
    .each(function(i, element) {
      if (element.type === "text" && parent)
        json.push({ tag: parent.name, text: element.data })
      else if (element.type === "tag") html2json($(this).html(), json, element)
    })

  return json
}

class ExportDocx extends Component {
  generate = document => {
    const doc = new Document()

    doc.Styles.createParagraphStyle("Heading1", "Heading 1")
      .color("000000")
      .bold()
      .size(64)
    doc.Styles.createParagraphStyle("Heading2", "Heading 2")
      .color("000000")
      .bold()
      .size(48)
    doc.Styles.createParagraphStyle("Heading3", "Heading 3")
      .color("000000")
      .bold()
      .size(42)
    doc.Styles.createParagraphStyle("Heading4", "Heading 4")
      .color("000000")
      .bold()
      .size(32)
    doc.Styles.createParagraphStyle("Heading5", "Heading 5")
      .color("000000")
      .bold()
      .size(26)
    doc.Styles.createParagraphStyle("Heading6", "Heading 6")
      .color("000000")
      .bold()
      .size(22)

    const paragraph = new Paragraph("Hello World")
    const institutionText = new TextRun("Foo Bar").bold()
    const dateText = new TextRun("Github is the best").tab().bold()
    paragraph.addRun(institutionText)
    paragraph.addRun(dateText)

    doc.addParagraph(paragraph)

    const packer = new Packer()

    packer.toBlob(doc).then(blob => {
      console.log(blob)
      saveAs(blob, "example.docx")
      console.log("Document created successfully")
    })
  }

  render() {
    const { document } = this.props
    console.log("Our document being parsed for exporting ", document)
    return (
      <Fragment>
        <h1>DOCX browser Word document generation</h1>

        <button type="button" onClick={() => this.generate(document)}>
          Click to generate document
        </button>
        <button type="button" onClick={() => create(document)}>
          Click to CREATE document
        </button>
      </Fragment>
    )
  }
}

export default ExportDocx
