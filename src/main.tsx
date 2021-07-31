import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { StoreContext } from './contexts'
import './global.css'
import client from './services/client'
import stores from './stores'

ReactDOM.render(
  <StoreContext.Provider value={stores}>
    <QueryClientProvider client={client}>
      <Router>
        <React.StrictMode>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </React.StrictMode>
      </Router>
    </QueryClientProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
)
