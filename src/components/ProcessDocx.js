import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import DnDFileReader from "./DnDFileReader"
import qs from "qs"
import { saveAs } from "file-saver"
import { saveDocyFile } from "../utils/saveDocyFile"
import SelectOption from "./inputs/SelectOption"
// Static docy template data
import {
  deedOfLeaseStandaloneData,
  cowLetterData,
  cowLicenseData,
  leaseInstrumentRegisteredData,
} from "../docyStaticTemplateData"
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

const staticDataOptions = [
  { name: "Deed of Lease Stand Alone", value: deedOfLeaseStandaloneData },
  { name: "Cow Letter Data", value: cowLetterData },
  { name: "Cow License Data", value: cowLicenseData },
  {
    name: "Lease Instrument Registered Data",
    value: leaseInstrumentRegisteredData,
  },
]

class ProcessDocx extends Component {
  constructor(props) {
    super(props)
    this.state = {
      templateData: staticDataOptions[0].value,
    }
  }

  processDocWithDocy = document => {
    const { size, name, lastModified, type } = document
    const { templateData } = this.state
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

  changeStaticData = templateData => {
    this.setState({
      templateData: templateData,
    })
  }

  render() {
    const { classes, children } = this.props
    const { templateData } = this.state
    return (
      <div>
        <h2>This will call our docy Service</h2>
        <SelectOption
          options={staticDataOptions}
          value={templateData}
          handleChange={templateData => this.changeStaticData(templateData)}
        />
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
