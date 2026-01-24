import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppProvider.jsx'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        offset={{ top: "25px", right: "20px" }}
      />
      <Toaster id="error" position='top-right' richColors />
    </AppProvider>
  </StrictMode>,
)
