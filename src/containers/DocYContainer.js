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
import { prettifyJson, uglifyJson } from "../utils/prettifyJson"

const staticDataOptions = [
  { name: "Agreement Known As", value: agreementKnownAs },
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
      jsonData: prettifyJson({
        "agreement.agreementKnownAs": "Heath's Great Lease",
        "agreement.commencementDate": "21/05/2017",
        "agreement.lesseeName": "Bob Brown",
        "agreement.lessorNameAndAddress": "Heath Dunlop",
        "agreement.streetAddress": "123, Fake Street",
        "agreement.leaseDesciption":
          "Thomas Greg Brown leases the Premises at Level 3, Trump Tower, 21 Jump Street, Auckland for $40,000 plus GST per annum",
        "agreement.lessorSignatory": "Mr Alex McMillan2",
        "agreement.lessorSignatoryRole": "Director",
        "agreement.lessorSignatoryOrganisation":
          "Lessor Signatory Organisation",
        "agreement.lessorEmail": "j.b@me.com",
        "agreement.lesseeEmail": "j.b@me.com",
        "agreement.lessorServiceAddress": "1 Bath Street, Dunedin",
        "agreement.lessorDescription": "Landlord Corp",
        "agreement.originalLessor": "The Bury Trust",
        "agreement.originalLessee": "T.H. Lewis Plc",
        "agreement.lessorMobile": "077 126 75170",
        "agreement.lessorPhone": "03 126 75170",
        "agreement.lessorStreetAddress": "123 Lessor Street",
        "agreement.lesseeName": "David Bromley",
        "agreement.lesseePersonalAddress":
          "200 Kilgour Street, Roslyn, Dunedin",
        "agreement.guarantorPersonalAddress":
          "200 Kilgour Street, Roslyn, Dunedin",
        "agreement.lesseeServiceAddress": "1 Bath Street, Dunedin",
        "agreement.lesseeDescription":
          "David Smith as Trustee of Smith Trust LTD",
        "agreement.outgoingInstallmentPeriod": "Monthly",
      }),
    }
  }

  changeStaticData = templateData => {
    this.setState({
      templateData: templateData,
    })
  }

  renderDataDescriptions = dataDescriptions => {
    const { classes } = this.props
    return Object.entries(dataDescriptions).map(([key, value], objIdx) => {
      return (
        <Fragment key={objIdx}>
          <dt className={classes.dt}>{`{${key}}`}</dt>
          <dd className={classes.dd}>{value}</dd>
        </Fragment>
      )
    })
  }

  handleErrors = response => {
    if (!response.ok) {
      response.json().then(error => {
        alert(error.message)
        alert(error.reason)
      })
      throw Error(response.statusText)
    }
    return response
  }

  processDocWithDocy = (document, templateData) => {
    const { size, name, lastModified, type } = document
    const fileName = name
      .split(".")
      .slice(0, -1)
      .join(".")
    let formData = new FormData()
    formData.append("file", document)
    formData.append("templateData", JSON.stringify(templateData))
    const endpoint = "http://localhost:3000/docy"

    const fetchOptions = {
      method: "POST",
      body: formData,
    }

    fetch(endpoint, fetchOptions)
      // 1. handle any error responses
      .then(res => this.handleErrors(res))
      // 2. if no errors turn the response into a blob
      .then(res => res.blob())
      // 3. save to file onto the client
      .then(myBlob => {
        saveDocyFile(myBlob, fileName)
      })
      // catch an errors unrelated to the server
      .catch(error => {
        alert(error)
      })
  }

  handleJsonChange = json => {
    this.setState({
      jsonData: json,
    })
  }

  prettifyJson = () => {
    // const jsonAsRaw = JSON.parse(this.state.jsonData)

    const jsonAsRaw = uglifyJson(this.state.jsonData)
    this.setState({
      jsonData: prettifyJson(jsonAsRaw),
    })
  }

  render() {
    const { theme, classes } = this.props
    const { templateData, dataDescriptions, dataValues, jsonData } = this.state
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

            <TypographySheet config={docYInfoConf} key="DocySection-1" />,
            <SelectOption
              options={staticDataOptions}
              value={templateData}
              handleChange={templateData => this.changeStaticData(templateData)}
              key="DocySection-2"
            />,
            <div>
              <textarea
                onBlur={() => this.prettifyJson()}
                style={{ width: "70%" }}
                rows="20"
                cols="50"
                value={jsonData}
                onChange={e => this.handleJsonChange(e.target.value)}
              />
              {/* <div onClick={() => this.prettifyJson()}>Prettify Json</div> */}
            </div>,
            <DnDFileReader
              injectStyles={{
                position: "relative",
                backgroundColor: "#FFF",
                minHeight: 388,
                minWidth: 400,
              }}
              processWordDoc={document =>
                this.processDocWithDocy(document, JSON.parse(jsonData))
              }
              key="DocySection-3"
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
