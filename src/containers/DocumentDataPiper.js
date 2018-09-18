import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// Components
import DnDFileReader from "../components/DnDFileReader"
import { saveAs } from "file-saver"
import { Event } from "@material-ui/icons"
const JSZipUtils = require("jszip-utils")

var JSZip = require("jszip")
var Docxtemplater = require("docxtemplater")

/**
 * READ THIS
 * https://github.com/Stuk/jszip/issues/403
 * https://stuk.github.io/jszip/documentation/examples/read-local-file-)api.html
 */

class DocumentDataPiper extends Component {
  // _processWordDocument = async document => {
  //   JSZipUtils.getBinaryContent(document, function(err, data) {
  //     if (err) {
  //       throw err // or handle err
  //     }
  //     var zip = new JSZip()
  //     zip.file("file.docx", data)
  //   })
  // }

  _processWordDocument = async file => {
    const { size, name, lastModified, type } = file
    let rawData
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    // Load and process the file as an arry buffer
    reader.onload = () => {
      let data = reader.result
      rawData = data
    }

    // when we have loaded it begin converting it to what docXtemplater needs
    reader.onloadend = () => {
      var zip = new JSZip(rawData)
      var doc = new Docxtemplater()
      doc.loadZip(zip)

      const documentData = this.props.documentData

      doc.setData(documentData)

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
      } catch (error) {
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({ error: e }))
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error
      }

      const newDocument = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })

      console.log("Original documengt Name => ", name)
      saveAs(newDocument, name)
    }
  }

  render() {
    return (
      <div>
        <DnDFileReader
          // processWordDoc={document => this._processWordDocument(document)}
          processWordDoc={document => this._processWordDocument(document)}
        />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(DocumentDataPiper)
