import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import DnDFileReader from "./DnDFileReader"
import qs from "qs"
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

class ProcessDocx extends Component {
  processDocWithDocy = document => {
    let formData = new FormData()
    formData.append("file", document)
    formData.append("bar", 123)

    const endpoint = "http://localhost:3000/docy"

    const data = { bar: 123, file: document }
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      // data: qs.stringify(data),
      data: formData,
      url: endpoint,
    }
    axios(options)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })

    // axios
    //   .get("http://localhost:3000/", {
    //     firstName: "Fred",
    //     lastName: "Flintstone",
    //   })
    //   .then(function(response) {
    //     console.log(response)
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //     alert("error from the server")
    //   })

    // axios
    //   .post(
    //     "http://localhost:3000/docy",
    //     {
    //       file: document,
    //     },
    //     axiosConfig
    //   )
    // .then(function(response) {
    //   console.log(response)
    // })
    // .catch(function(error) {
    //   console.log(error)
    // })
  }

  render() {
    const { classes, children } = this.props
    return (
      <div>
        <h2>This will call our docy Service</h2>
        {/* <form method="post" enctype="multipart/form-data">
          <input type="file" name="files[]" multiple />
          <input type="submit" value="Upload File" name="submit" />
        </form> */}
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
