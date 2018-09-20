import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// Redux
import { addLoadedDocument, removeLoadedDocument } from "../actions/docYActions"
import {
  addDataConf,
  removeDataConf,
  addAvailableConf,
} from "../actions/dataConnectorActions"
import { connect } from "react-redux"
// page layout
import DrawerPage from "../layouts/DrawerPage"
// components
import CreateDataConf from "../components/CreateDataConfig"

class CreateDataConfigContainer extends Component {
  render() {
    const {
      dataConnector: { availableConfigs },
    } = this.props

    console.log("AVAILABLE CONFIGS ", availableConfigs)

    return (
      <div>


        {Object.keys(availableConfigs).map((confKey, confKeyIdx) => {
          return <div>{confKey}</div>
        })}

        {availableConfigs.map((conf, confIdx) => {
          return (
            <div key={confIdx}>
              <div>ConfID: {conf.id}</div>
              <div>confData: {JSON.stringify(conf.confData)}</div>
            </div>
          )
        })}

        <CreateDataConf
          createConfig={config => this.props.addAvailableConf(config)}
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
    removeDataConf: confKey => dispatch(removeDataConf(confKey)),
    addAvailableConf: conf => dispatch(addAvailableConf(conf)),
  })
)

export default compose(
  withRouter,
  reduxWrapper,
  withApollo
)(CreateDataConfigContainer)
