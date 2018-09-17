import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// Components
import DnDFileReader from "../components/DnDFileReader"
import { saveAs } from "file-saver"
const JSZipUtils = require("jszip-utils")
var JSZip = require("jszip")
var Docxtemplater = require("docxtemplater")

var fs = require("fs")
var path = require("path")

function loadFile(url, callback) {
  JSZipUtils.getBinaryContent(url, callback)
}

/**
 * READ THIS
 * https://github.com/Stuk/jszip/issues/403
 */

class DocumentDataPiper extends Component {
  _processWordDocument = async document => {
    // var zip = new JSZip(document)
    // var zip = new JSZip()
    // // zip.file("file.txt", "content")
    // zip.file("file.txt", document)

    // zip.file("file.txt").name // "file.txt"

    var zip = new JSZip()
    zip.file("amount.txt", "€15")
    zip.file("amount.txt").async("string") // a promise of "€15"
    zip.file("amount.txt").async("arraybuffer") // a promise of an ArrayBuffer containing €15 encoded as utf8
    zip.file("amount.txt").async("uint8array") // a promise of an Uint8Array containing €15 encoded as utf8

    console.log("The ZIP => ", zip)

    // var zip = new JSZip()
    // zip.file("file.txt", "content")
    // var doc = new Docxtemplater().loadZip(zip)
    // doc.setData({
    //   first_name: "John",
    //   last_name: "Doe",
    //   phone: "0652455478",
    //   description: "New Website",
    // })

    // try {
    //   // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    //   doc.render()
    // } catch (error) {
    //   var e = {
    //     message: error.message,
    //     name: error.name,
    //     stack: error.stack,
    //     properties: error.properties,
    //   }
    //   console.log(JSON.stringify({ error: e }))
    //   // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    //   throw error
    // }

    // var out = doc.getZip().generate({
    //   type: "blob",
    //   mimeType:
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // }) //Output the document using Data-URI
    // saveAs(out, "output.docx")
  }

  render() {
    return (
      <div>
        <DnDFileReader
          processWordDoc={document => this._processWordDocument(document)}
        />
        You can drop documents into here and they will be replaced data
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(DocumentDataPiper)
