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
import PlainSheet from "../components/PlainSheet"
import TypographySheet from "../components/TypographySheet"
import DnDFileReader from "../components/DnDFileReader"
// module specific components
import DownloadExample from "../components/DocY/DownloadExample"
import DataConnector from "../components/DocY/DataConnector"
import LoadedDocumentDetails from "../components/DocY/LoadedDocumentDetails"
// Utils
import { listObjectValues } from "../utils/renderNestedObject"
import { saveAs } from "file-saver"
// Styles
import withStyles from "@material-ui/core/styles/withStyles"

var JSZip = require("jszip")
var Docxtemplater = require("docxtemplater")

/**
 * READ THIS
 * https://github.com/Stuk/jszip/issues/403
 * https://stuk.github.io/jszip/documentation/examples/read-local-file-)api.html
 */

const styles = theme => ({
  dropWrapper: {
    width: theme.spacing.unit * 30,
    height: theme.spacing.unit * 30 * 1.618,
  },
})

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

class DocYContainer extends Component {
  _processWordDocument = async (file, docData) => {
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

      // const documentData = this.props.documentData
      const documentData = docData

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

  _renderDataConfigs = configs => {
    // return `You have ${configs.length} configs set`

    return (
      <div>
        <div>{configs.length} configs set</div>
        <div>
          {configs.map((conf, confIdx) => {
            return (
              <div>
                <div onClick={() => this.props.removeDataConf(confIdx)}>
                  Remove Config
                </div>
                {listObjectValues(conf.confData)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  _renderSuperConfig = conf => {
    return (
      <div>
        <div>{listObjectValues(conf)}</div>
      </div>
    )
  }

  render() {
    const {
      classes,
      theme,
      docY: { loadedDocuments },
      dataConnector: { dataConf },
    } = this.props

    const DragNDropHeight = theme.spacing.unit * 30 * 1.618
    const DragNDropWidth = theme.spacing.unit * 30

    console.log("Theme vars to use in container ", theme)
    //1. we fetch an object of key value pairs
    const documentData = _fetchDocumentData()
    //2. we come up with some way to display these nicely that looks nice and allows the user to know how to construct their templates
    // We know actually need to hold the file in the state so that we can do a button click to process
    //3 . loadedDocument should be in the store and should be an array
    //4. We should be able to have multiple instances of this LoadedDocumentDetails
    /**
     * BIG NOTE: Ok I think with the configs we should present them as. Well I dont actually know right now.
     * dataConfigs is an array. each item is an object. With that object comes a key confData which is an object of the keyValues that can be used
     */

    // BigStep 1. dataConfigs if we have them we can map over them or use reducer. The aim is to gather all the props.
    // Ok now bear with. I think we should extract the name/id for the config and be used to prePend so it knows about the conf.
    // conf1.name, conf2.name. Now i know this stuff exists in confData so we will have a function for this.
    // const replaceableData = dataConfigs.reduce((accumulator, currentValue) => {
    //   console.log("reduce current Val ", currentValue)
    //   accumulator + currentValue.id
    //   return accumulator + { name: "This work? ", value: "Propbs not" }
    //   // return currentValue.id
    //   // return {
    //   //   currentValue
    //   // }
    // }, {})

    return (
      <div>
        <DrawerPage
          title="docY 😎 "
          drawTitle="🔥 DATA 🔥"
          drawItems={[
            // dataConfigs ? this._renderDataConfigs(dataConfigs) : null,
            // dataConfigs ? this._renderDataConfigs(configsAsData) : null,
            dataConf ? this._renderSuperConfig(dataConf) : null,
          ]}
          children={[
            <TypographySheet config={docYInfoConf} />,
            <PlainSheet
              children={[
                <DataConnector />,
                <DownloadExample />,
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    maxWidth: `calc(100vw - ${theme.spacing.unit * 7}px)`,
                    overflow: "auto",
                    minHeight: DragNDropHeight,
                    minWidth: DragNDropWidth,
                  }}>
                  <div
                    className={classes.dropWrapper}
                    style={{
                      position: "static",
                      minWidth: DragNDropWidth,
                      minHeight: DragNDropHeight,
                      backgroundColor: "#FFF",
                      zIndex: 1000,
                    }}>
                    <DnDFileReader
                      injectStyles={{
                        position: "absolute",
                        backgroundColor: "#FFF",
                        minHeight: DragNDropHeight,
                        minWidth: DragNDropWidth,
                      }}
                      processWordDoc={document =>
                        this.props.addLoadedDocument(document)
                      }
                    />
                  </div>
                  {loadedDocuments &&
                    loadedDocuments.map((doc, docIdx) => {
                      return (
                        <LoadedDocumentDetails
                          key={docIdx}
                          document={doc}
                          processDocument={() =>
                            this._processWordDocument(doc, dataConf)
                          }
                          remove={() => this.props.removeLoadedDocument(docIdx)}
                        />
                      )
                    })}
                </div>,
              ]}
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
    removeDataConf: confIdx => dispatch(removeDataConf(confIdx)),
  })
)

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  reduxWrapper,
  withApollo
)(DocYContainer)
