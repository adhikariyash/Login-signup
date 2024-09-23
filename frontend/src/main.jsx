import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PageProvider } from './components/pagecontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <PageProvider>
     <App />
  </PageProvider>
  </StrictMode>,
)
