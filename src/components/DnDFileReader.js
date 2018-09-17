import React, { Component } from "react"
import PropTypes from "prop-types"
import AlertMessage from "./AlertMessage"
import withStyles from "@material-ui/core/styles/withStyles"
import classNames from "classnames"
import Button from "@material-ui/core/Button"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"

const styles = theme => ({
  dropZone: {
    border: `1px dashed ${theme.palette.primary.main}`,
    //height: '333px',
    //width: '300px',
    width: theme.spacing.unit * 30,
    height: theme.spacing.unit * 30 * 1.618,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    boxSizing: "border-box",
  },
  dropHover: {
    border: `3px dashed ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
  },
  dropTitle: {
    fontSize: "18px",
  },
  dropSubTitle: {
    fontSize: "14px",
  },
  cloudUploadIcon: {
    height: "5em",
    width: "5em",
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class DnDFileReader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 0,
      dragStatus: "",
      uploading: false,
      uploadPercent: 0,
      fileSrc: null,
      rawFile: null,
      type: null,
      error: null,
      alertText: "",
    }
  }

  processWordDocument = content => {
    this.props.processWordDoc(content)
  }

  render = () => {
    let { error, alertText } = this.state
    console.log("workbookSrc ", this.state.fileSrc)
    let components = []
    let barStyle = {
      width: this.state.uploadPercent + "%",
    }

    if (error) {
      return (
        <AlertMessage
          open={true}
          alertText={alertText}
          dismissAlert={() => this.resetUploader()}
        />
      )
    }

    switch (this.state.stage) {
      case 0:
        this.renderUploadForm(components, barStyle)
        break
      case 1:
        this.renderWait(components, barStyle)
        break
      default:
        this.renderUploadForm(components, barStyle)
    }

    return (
      <div>
        <div className={"dropZoneFileWrap"}>{components}</div>
      </div>
    )
  }

  resetUploader = () => {
    this.setState({
      stage: 0,
      dragStatus: "",
      uploading: false,
      uploadPercent: 0,
      DisplayFile: null,
      type: null,
      size: null,
      name: null,
      lastModified: null,
      CSVColumns: null,
      error: null,
      alertText: "",
    })
  }

  renderUploadForm = (components, barStyle) => {
    const { classes } = this.props
    components.push(
      <div>
        <div
          key={"uploadForm"}
          onClick={this.onZoneClick}
          className={
            this.state.dragStatus === "dropHover"
              ? classNames(classes.dropZone, classes.dropHover)
              : classes.dropZone
          }
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}>
          <span className={classes.dropTitle}>{"Drag and drop image"}</span>

          <CloudUploadIcon className={classes.cloudUploadIcon} />
          <input
            key={"uploadInput"}
            ref={"uploadInput"}
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
            onChange={this.onFileChange}
          />
          <span className={classes.dropSubTitle}>{"or click to browse"}</span>
          <label htmlFor="raised-button-file">
            <Button
              variant="raised"
              component="span"
              className={classes.button}>
              Browse Files
            </Button>
          </label>
          <div key={"progressContainer"} className={"progress"}>
            <div style={barStyle} className={"progressBar"} />
          </div>
        </div>
      </div>
    )
  }

  renderWait = (components, barStyle) => {
    components.push(
      <div key={"dropKey"} className={"dropZone " + this.state.dragStatus}>
        <span className={"dropMessage"}>{"Please wait..."}</span>
        <div key={"progressContainer"} className={"progress"}>
          <div style={barStyle} className={"progressBar"} />
        </div>
      </div>
    )
  }

  pushDataUp = gLCodesArray => {
    this.props.recieveData(gLCodesArray, this.state.importOption)
  }

  processFile = file => {
    const { size, name, lastModified, type } = file

    const fileType = this.getFileType(type)
    const check = this.checkValidFile(fileType, type)
    if (check === false) {
      return // Stop running things
    }

    this.setState({
      type: fileType,
      size: size,
      name: name,
      lastModified: lastModified,
    })
    switch (fileType) {
      case "wordDocument":
        this.processWordDocument(file)
        break
      case "img":
        this.processImage(file)
        break
      case "text":
        this.processText(file)
        break
      case "xlxs":
        this.processXlxsWorkbook(file)
        break
      case "csv":
        this.processCsv(file)
        break
      case "video":
        this.processVideo(file)
        break
      default:
        this.unKownError(
          "Unkown Error ",
          "trying to process an unkown file please contact 'https://github.com/dunatron'"
        )
    }
  }

  processFileData = data => {
    const { type, size, rawFile, name, lastModified } = this.state
    this.props.processData(data, rawFile, type, name, size, lastModified)
  }

  unKownError = (header, message) => {
    this.setState({
      error: true,
      alertText: header + "\n" + message,
    })
  }

  checkValidFile = (type, extension) => {
    if (type === "invalidType") {
      // reset everything and throw an error
      this.setState({
        error: true,
        alertText: "Invalid File Type \n" + extension,
      })
      return false
    }
    return true
  }

  getFileType = type => {
    // Type expressions
    const imageExpression = /image.*/
    const textExpression = /text.*/
    const csvExpression = /\.csv$/
    const msCSVExpression = /application\/vnd\.ms-excel$/i
    const xlxsExpression =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    const videoExpression = /video.*/

    const msWord = "application/msword"
    const microsoftWordDocument =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    if (type.match(imageExpression)) {
      return "img"
    } else if (type.match(msWord)) {
      return "wordDocument"
    } else if (type.match(microsoftWordDocument)) {
      return "wordDocument"
    } else if (type.match(textExpression)) {
      return "text"
    } else if (type.match(csvExpression)) {
      return "csv"
    } else if (type.match(videoExpression)) {
      return "video"
    } else if (type.match(xlxsExpression)) {
      return "xlxs"
    } else {
      return "invalidType"
    }
  }

  onFileChange = e => {
    e.stopPropagation()
    let file = this.extractSingleFile(this.refs.uploadInput.files)
    this.refs.uploadInput.click()

    this.processFile(file)
  }

  extractSingleFile = files => {
    return files[0]
  }

  onDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "",
    })
    let file = this.extractSingleFile(e.dataTransfer.files)

    this.processFile(file)
  }

  onDragEnter = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "dropHover",
    })
  }

  onDragLeave = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "",
    })
  }

  onDragOver = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "dropHover",
    })
  }

  onZoneClick = e => {
    e.stopPropagation()
    // e.preventDefault()
    // this.refs.uploadInput.click()
  }
}

DnDFileReader.propTypes = {
  FileType: PropTypes.string,
}

export default withStyles(styles)(DnDFileReader)
