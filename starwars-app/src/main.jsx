import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Libreria necesaria para primer react
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
  </StrictMode>,
)
