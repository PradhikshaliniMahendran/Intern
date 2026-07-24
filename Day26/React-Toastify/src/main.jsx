import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import 'C:/Users/mahen/OneDrive/Desktop/Intern/Day23/student-management/src/index.css'

createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //</React.StrictMode>
)
