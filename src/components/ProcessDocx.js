import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import DnDFileReader from "./DnDFileReader"
import qs from "qs"
import { saveAs } from "file-saver"
import { saveDocyFile } from "../utils/saveDocyFile"
const axios = require("axios")

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    flexBasis: 0,
    minWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    boxSizing: "border-box",
    textAlign: "left",
  },
})

const _processDocYFile = response => {
  console.log("The res ", response)
  saveDocyFile(response.data, "testTheFile")
}

const templateData = {
  clientName: "I am the client Name",
}

class ProcessDocx extends Component {
  processDocWithDocy = document => {
    const { size, name, lastModified, type } = document
    const fileName = name
      .split(".")
      .slice(0, -1)
      .join(".")
    console.log("HERE IS NAME ", name)
    let formData = new FormData()
    formData.append("file", document)
    formData.append("templateData", JSON.stringify(templateData))
    const endpoint = "http://localhost:3000/docy"

    const fetchOptions = {
      method: "POST",
      body: formData,
    }

    fetch(endpoint, fetchOptions)
      .then(function(response) {
        if (response.ok) {
          return response.blob()
        }
        throw new Error("Network response was not ok.")
      })
      .then(function(myBlob) {
        saveDocyFile(myBlob, fileName)
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        )
      })
  }

  render() {
    const { classes, children } = this.props
    return (
      <div>
        <h2>This will call our docy Service</h2>
        <DnDFileReader
          injectStyles={{
            position: "relative",
            backgroundColor: "#FFF",
            minHeight: 388,
            minWidth: 400,
          }}
          processWordDoc={document => this.processDocWithDocy(document)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ProcessDocx)
