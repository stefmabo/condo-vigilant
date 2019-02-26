import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import VisitList from 'components/VisitList/'

import { ModalProvider } from 'components/common/Modal/ModalContext'

import { baseUrlHTTP, baseUrlWebSocket } from './const'

import * as serviceWorker from './serviceWorker'

import 'style/common.scss'
import 'style/custom.scss'

const httpLink = createHttpLink({
  uri: baseUrlHTTP,
})

const wsLink = new WebSocketLink({
  uri: baseUrlWebSocket,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
})
const client = new ApolloClient({ link, cache })

const main = '#17a2b8'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main,
      error: '#B00020',
      success: '#4CAE50',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  typography: {
    useNextVariants: true,
  },
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <ModalProvider>
            <VisitList />
          </ModalProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

const EnhancedApp = App

const rootElement = document.getElementById('root')
ReactDOM.render(<EnhancedApp />, rootElement)
serviceWorker.unregister()
