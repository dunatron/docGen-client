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

class ProcessDocx extends Component {
  processDocWithDocy = document => {
    let formData = new FormData()
    formData.append("file", document)
    formData.append("bar", 123)
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
        saveDocyFile(myBlob, "testTheFile")
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
            position: "absolute",
            backgroundColor: "#FFF",
            minHeight: 800,
            minWidth: 400,
          }}
          processWordDoc={document => this.processDocWithDocy(document)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ProcessDocx)
