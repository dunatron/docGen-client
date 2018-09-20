import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// Styles
import withStyles from "@material-ui/core/styles/withStyles"
// Queries
import { ORG_DATA_CONFIGS } from "../queries/getOrgDataConfigs"
import { Query } from "react-apollo"

import { ORGANISATION_ID } from "../constants"

const styles = theme => ({
  dropWrapper: {
    width: theme.spacing.unit * 30,
    height: theme.spacing.unit * 30 * 1.618,
  },
})

class OrgDataConfigsContainer extends Component {
  _getQueryVariables = () => {
    return {
      orgId: localStorage.getItem(ORGANISATION_ID),
    }
  }

  _organisationDataConfigs = () => {
    return (
      <Query query={ORG_DATA_CONFIGS} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          {
            console.log("THE DATA ", data)
          }
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const { orgDataConfigs } = data

          return (
            <div style={{ display: "block" }}>
              {orgDataConfigs.map((dataConf, dataConfIdx) => {
                return (
                  <div>
                    <div>{dataConf.name}</div>
                    <div>
                      URL: we will call endpoints When clicked and load the data
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }}
      </Query>
    )
  }

  render() {
    const {} = this.props

    return (
      <div>
        Organisation Data Configs
        <div>{this._organisationDataConfigs()}</div>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withApollo
)(OrgDataConfigsContainer)
