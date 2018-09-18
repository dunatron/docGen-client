import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// page layout
import FullPage from "../layouts/FullPage"
import DrawerPage from "../layouts/DrawerPage"
// containers
import DocumentDataPiper from "../containers/DocumentDataPiper"
// Components
import PlainSheet from "../components/PlainSheet"
import TypographySheet from "../components/TypographySheet"
import ActionButton from "../components/ActionButton"
// Utils
import { listObjectValues } from "../utils/renderNestedObject"
import { withStyles } from "@material-ui/core/styles"

const downloadExample = () => {
  return (
    <ActionButton
      text="Download Example"
      color="secondary"
      variant="outlined"
      onClick={() => alert("Download docx file")}
    />
  )
}

// const dataPiperInfoConf = [
//   { type: "h1", variant: "title", value: "This is The Data Piper" },
//   { type: "h2", variant: "headline", value: "I am using Typograhpy Sheet 🔥" },
//   { type: "h3", value: "This is a header 3" },
//   { type: "p", paragraph: true, value: "This is paragrapgh" },
//   { variant: "subheading", value: "I am just some random sub heading" },
// ]

const dataPiperInfoConf = [
  {
    type: "h1",
    gutterBottom: true,
    variant: "title",
    value: "This is The Data Piper",
  },
  {
    type: "h2",
    variant: "subheading",
    color: "secondary",
    value: "Instructions: ",
  },
  {
    type: "p",
    variant: "body1",
    value: "To the Left is all the data you can use when in your word template",
  },
  {
    type: "p",
    // paragraph: true,
    gutterBottom: true,
    variant: "body1",
    value:
      "These attributes can be used inside of your word templates as long as they are surrounded by {} e.g {leaseName}",
  },
  {
    type: "p",
    variant: "body1",
    value:
      "Loops: we can use some conditional logic in our templates. For example if our data had an array of events we could do the following in our word document",
  },
  {
    type: "p",
    variant: "body2",
    value: `{#events}
    {name}
    {date}
  {/events}`,
  },
]

const dataConnector = () => {
  return (
    <div style={{ padding: "16px" }}>
      This is data connector. It will need a way of getting data
    </div>
  )
}

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

const renderDataAsReadableList = data => {
  return listObjectValues(data)
}

class DataPiper extends Component {
  render() {
    const documentData = _fetchDocumentData()
    const readableData = renderDataAsReadableList(documentData)
    return (
      <DrawerPage
        title="<= [DATA PIPER DATA] => 😎 "
        drawTitle="🔥 DATA 🔥"
        drawItems={[readableData]}
        children={[
          <TypographySheet config={dataPiperInfoConf} />,
          <PlainSheet
            children={[
              <TypographySheet config={dataPiperInfoConf} />,
              dataConnector(),
              downloadExample(),
            ]}
          />,
          <DocumentDataPiper documentData={documentData} />,
        ]}
      />
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(DataPiper)
