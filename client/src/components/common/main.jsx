import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Silence console output only in production builds to avoid hiding dev-time errors
if (import.meta.env.PROD) {
  (() => {
    const noop = () => {};
    if (typeof window !== 'undefined' && window.console) {
      window.console.log = noop;
      window.console.info = noop;
      window.console.warn = noop;
      window.console.error = noop;
      window.console.debug = noop;
    }
  })();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
