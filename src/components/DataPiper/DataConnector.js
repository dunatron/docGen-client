import React from "react"
import { addDataConf, removeDataConf } from "../../actions/dataConnectorActions"
import { connect } from "react-redux"
import { compose } from "react-apollo"

const DataConnector = ({ dataConnector, addDataConf, removeDataConf }) => {
  const config1 = {
    id: "conf1",
    name: "Config 1",
    confData: {
      name: "Agreement Name",
      createdAt: "12/03/1991",
    },
  }
  const config2 = {
    id: "conf2",
    name: "Config 2",
    confData: {
      events: [
        {
          id: 1,
          name: "First Event",
        },
        {
          id: 2,
          name: "Second Event",
        },
      ],
    },
  }
  const leaseInstrumentConf = {
    id: "leaseInstrumentConf",
    name: "Lease Instrument Config",
    confData: {
      titleReference: "This is the Title reference",
      premiseDescFirstSchedule:
        "Here is the description for the premises for the first schedule",
      lessor: "Registered proprietor",
      lesse: "SPARK NEW ZEALAND TRADING LIMITED",
      estate: "Fee simple",
      memorandumNum: "Not applicable",
      term: "Six (6) years from the Commencement Date",
      rental: "See Annexure Schedule.",
    },
  }
  return (
    <div style={{ padding: "16px" }}>
      This is data connector. It will need a way of getting data
      <div onClick={() => addDataConf(config1)}>
        ADD CONFIG 1. Agreement Details
      </div>
      <div onClick={() => addDataConf(config2)}>ADD CONFIG 2. Events</div>
      <div onClick={() => addDataConf(leaseInstrumentConf)}>
        ADD CONFIG Lease Instrument
      </div>
    </div>
  )
}

const reduxWrapper = connect(
  state => ({
    dataConnector: state.dataConnector,
  }),
  dispatch => ({
    addDataConf: conf => dispatch(addDataConf(conf)),
    removeDataConf: confIdx => dispatch(removeDataConf(confIdx)),
  })
)

// export default DataConnector

export default compose(
  //withStyles(styles, { withTheme: true }),
  reduxWrapper
)(DataConnector)
