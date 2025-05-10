import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// we need this for multiple pages
import {BrowserRouter} from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'



// to support multiple pages we want react router dom 
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
     <App />
  </AppContextProvider>
   
  </BrowserRouter>,
)
