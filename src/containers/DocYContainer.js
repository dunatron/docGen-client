import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// Redux
import { addLoadedDocument, removeLoadedDocument } from "../actions/docYActions"
import { addDataConf, removeDataConf } from "../actions/dataConnectorActions"
import { connect } from "react-redux"
// page layout
import DrawerPage from "../layouts/DrawerPage"
// Configs
import { docYInfoConf } from "../configs/docYInfoConf"
// Components
import ProcessDocx from "../components/ProcessDocx"
import DnDFileReader from "../components/DnDFileReader"
import TypographySheet from "../components/TypographySheet"
import SelectOption from "../components/inputs/SelectOption"
// module specific components
import { saveAs } from "file-saver"
// Styles
import withStyles from "@material-ui/core/styles/withStyles"
// static Data
import { agreementKnownAs } from "../components/DocY/agreementknowAsData"
//Utils
import { saveDocyFile } from "../utils/saveDocyFile"
import {
  flattenDataDescriptions,
  flattenDataValues,
} from "../utils/flattenData"

const staticDataOptions = [
  { name: "Agreement Know As", value: agreementKnownAs },
]

const styles = theme => ({
  dropWrapper: {
    width: theme.spacing.unit * 30,
    height: theme.spacing.unit * 30 * 1.618,
  },
  dl: {
    padding: 15,
  },
  dt: {
    fontWeight: 900,
  },
  dd: {
    marginBottom: 15,
    fontSize: 13,
    fontStyle: "italic",
    marginInlineStart: "30px",
  },
})

class DocYContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      templateData: staticDataOptions[0].value,
      dataDescriptions: flattenDataDescriptions(
        staticDataOptions[0].value,
        "agreement"
      ),
      dataValues: flattenDataValues(staticDataOptions[0].value, "agreement"),
    }
  }

  changeStaticData = templateData => {
    this.setState({
      templateData: templateData,
    })
  }

  renderDataDescriptions = dataDescriptions => {
    const { classes } = this.props
    return Object.entries(dataDescriptions).map(([key, value]) => {
      console.log(`${key} ${value}`) // "a 5", "b 7", "c 9"
      return (
        <Fragment>
          <dt className={classes.dt}>{`{${key}}`}</dt>
          <dd className={classes.dd}>{value}</dd>
        </Fragment>
      )
    })
  }

  processDocWithDocy = (document, templateData) => {
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
    const { theme, classes } = this.props
    const { templateData, dataDescriptions, dataValues } = this.state
    console.log("FIND A FILED WITH A VALUE ", dataValues)
    const renderDataDescriptions = renderDataDescriptions
    return (
      <div>
        <DrawerPage
          title="docY 😎 "
          drawTitle="🔥 DATA 🔥"
          drawItems={[
            <dl className={classes.dl}>
              {this.renderDataDescriptions(dataDescriptions)}
            </dl>,
          ]}
          children={[
            // <ProcessDocx />,
            <TypographySheet config={docYInfoConf} />,
            <SelectOption
              options={staticDataOptions}
              value={templateData}
              handleChange={templateData => this.changeStaticData(templateData)}
            />,
            <DnDFileReader
              injectStyles={{
                position: "relative",
                backgroundColor: "#FFF",
                minHeight: 388,
                minWidth: 400,
              }}
              processWordDoc={document =>
                this.processDocWithDocy(document, dataValues)
              }
            />,
          ]}
        />
      </div>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    docY: state.docY,
    dataConnector: state.dataConnector,
  }),
  dispatch => ({
    addLoadedDocument: document => dispatch(addLoadedDocument(document)),
    removeLoadedDocument: docIdx => dispatch(removeLoadedDocument(docIdx)),
    addDataConf: conf => dispatch(addDataConf(conf)),
    removeDataConf: confKey => dispatch(removeDataConf(confKey)),
  })
)

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  reduxWrapper,
  withApollo
)(DocYContainer)
