import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// page layout
import DrawerPage from "../layouts/DrawerPage"
// Components
import PlainSheet from "../components/PlainSheet"
import TypographySheet from "../components/TypographySheet"
import DnDFileReader from "../components/DnDFileReader"
// module specific components
import DownloadExample from "../components/DataPiper/DownloadExample"
import DataConnector from "../components/DataPiper/DataConnector"
// Utils
import { listObjectValues } from "../utils/renderNestedObject"
import { saveAs } from "file-saver"
import { withStyles } from "@material-ui/core/styles"
const JSZipUtils = require("jszip-utils")

var JSZip = require("jszip")
var Docxtemplater = require("docxtemplater")

/**
 * READ THIS
 * https://github.com/Stuk/jszip/issues/403
 * https://stuk.github.io/jszip/documentation/examples/read-local-file-)api.html
 */

const dataPiperInfoConf = [
  {
    type: "h1",
    gutterBottom: true,
    variant: "title",
    value: "This is The Data Piper",
  },
  {
    type: "h2",
    variant: "subheading",
    color: "secondary",
    value: "Instructions: ",
  },
  {
    type: "p",
    variant: "body1",
    value: "To the Left is all the data you can use when in your word template",
  },
  {
    type: "p",
    // paragraph: true,
    gutterBottom: true,
    variant: "body1",
    value:
      "These attributes can be used inside of your word templates as long as they are surrounded by {} e.g {leaseName}",
  },
  {
    type: "p",
    variant: "body1",
    value:
      "Loops: we can use some conditional logic in our templates. For example if our data had an array of events we could do the following in our word document",
  },
  {
    type: "p",
    variant: "body2",
    value: `{#events}
    {name}
    {date}
  {/events}`,
  },
]

const _fetchDocumentData = () => {
  return {
    name: "John",
    company: "Doe",
    address1: "0652455478",
    address2: "New Website",
    city: "Dunedin",
    country: "New Zealand",
    sparkName: "Spark Company is Shit",
    clientName: "Jonny Mirkin",
    content: `Howdy, How are we all today? Some sort of document clause snippet`,
    author: "Dunatron",
    authorJobTitle: "Developer",
    events: [
      {
        name: "The First Event",
        date: "21/03/1966",
      },
      {
        name: "The Second Event",
        date: "24/03/1966",
      },
    ],
  }
}

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
    const documentData = _fetchDocumentData()
    const readableData = listObjectValues(documentData)
    return (
      <div>
        <DrawerPage
          title="DATA PIPER 😎 "
          drawTitle="🔥 DATA 🔥"
          drawItems={[readableData]}
          children={[
            <TypographySheet config={dataPiperInfoConf} />,
            <PlainSheet
              children={[
                <DataConnector />,
                <DownloadExample />,
                <DnDFileReader
                  // processWordDoc={document => this._processWordDocument(document)}
                  processWordDoc={document =>
                    this._processWordDocument(document)
                  }
                />,
              ]}
            />,
          ]}
        />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(DocumentDataPiper)
