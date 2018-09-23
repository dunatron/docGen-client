import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { compose, withApollo } from "react-apollo"
import {
  removeDataConf,
  addAvailableConf,
} from "../actions/dataConnectorActions"
import { connect } from "react-redux"
// components
import CreateDataConf from "../components/CreateDataConfig"

class CreateDataConfigContainer extends Component {
  render() {
    const {
      dataConnector: { availableConfigs },
    } = this.props

    return (
      <div>
        {Object.keys(availableConfigs).map((confKey, confKeyIdx) => {
          return <div>{confKey}</div>
        })}

        {availableConfigs.map((conf, confIdx) => {
          return (
            <div key={confIdx}>
              <div>confName: {conf.name}</div>
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
