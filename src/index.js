import React from 'react'
import App from '@shared/App'
import { createRoot } from 'react-dom/client'
import { store } from '@shared/store'
import { Provider } from 'react-redux'
import '@shared/index.css'

const container = document.getElementById('react_root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
)
