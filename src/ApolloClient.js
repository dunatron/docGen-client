import React from "react"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"
import { ApolloLink, concat } from "apollo-link"
import { connect } from "react-redux"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import customTheme from "./theme"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { createMuiTheme } from "@material-ui/core/styles"

import { grey, amber, red } from "@material-ui/core/colors"
import createPalette from "@material-ui/core/styles/createPalette"

const muiTheme = createMuiTheme(customTheme)

// let GRAPHQL_ENDPOINT =
//   "https://us1.prisma.sh/heath-dunlop-37e897/hacker-server-db/dev"

let GRAPHQL_ENDPOINT = "http://localhost:4000"

// const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT })
// const createAuthMiddleware = token =>
//   new ApolloLink((operation, forward) => {
//     // add the authorization to the headers
//     if (token) {
//       operation.setContext({
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       })
//     }
//     return forward(operation)
//   })

// const createClient = token =>
//   new ApolloClient({
//     link: concat(createAuthMiddleware(token), httpLink),
//     cache: new InMemoryCache({
//       dataIdFromObject: o => {
//         if (o.ID >= 0 && o.__typename) {
//           return `${o.__typename}:${o.ID}`
//         }
//         return null
//       },
//     }),
//   })

// const client = createClient(localStorage.getItem("jwt"))
// const theme = createMuiTheme(customTheme)

const ApolloApp = ({ token }) => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
)

export default connect(state => ({
  token: state.token,
}))(ApolloApp)
