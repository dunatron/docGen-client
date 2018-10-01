import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
import { Query } from "react-apollo"
import DocumentGenerator from "./DocumentGenerator"
import SelectOption from "../components/inputs/SelectOption"
// Moustache Templates
import CowLetterTemplate from "../templates/cowLetter"
import CowLicenseTemplate from "../templates/cowLicense"

class SingleDocumentContainer extends Component {
  state = {
    selectedTemplate: CowLetterTemplate,
  }

  _getQueryVariables = () => {
    const idFromPath = this.props.location.pathname.split("/")[2] // this is highly unstable, change asap

    const id = idFromPath

    return { id }
  }

  changeTemplate = template => {
    this.setState({
      selectedTemplate: template,
    })
  }

  render() {
    const templateOptions = [
      { name: "Cow Letter Template", value: CowLetterTemplate },
      { name: "Cow License", value: CowLicenseTemplate },
    ]
    const { selectedTemplate } = this.state
    return (
      <Query
        query={SINGLE_DOCUMENT_QUERY}
        variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const { singleDocument } = data
          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <SelectOption
                options={templateOptions}
                value={selectedTemplate}
                handleChange={template => this.changeTemplate(template)}
              />
              <DocumentGenerator
                document={singleDocument}
                //template="Welcome {{title}} Agreement Name: {{agreements.name}}"
                //   template="{{#agreements}}
                //   <b>{{name}}</b>
                // {{/agreements}}"
                template={selectedTemplate}
                //data={{ title: "Mr. Gregory" }}
              />
            </div>
          )
        }}
      </Query>
    )
  }
}

// export default compose(
//   //graphql(VOTE_MUTATION, { name: "upVoteMutation" }),
//   withApollo
// )(SingleDocumentContainer)

export default compose(
  withRouter,
  withApollo
)(SingleDocumentContainer)
