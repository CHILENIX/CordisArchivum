import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/App.css'

// Handle redirects from 404.html
const maybeRedirectPath = sessionStorage.getItem('redirectPath');
if (maybeRedirectPath) {
  sessionStorage.removeItem('redirectPath');
  // The router in App.jsx will handle this path
  window.history.replaceState(null, '', maybeRedirectPath);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
