import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { StoreContext } from './contexts'
import './global.css'
import client from './services/client'
import store from './stores'

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <QueryClientProvider client={client}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </QueryClientProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
)
