import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataState from './Context/DataState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataState>
      <App />
    </DataState>
  </StrictMode>,
)
