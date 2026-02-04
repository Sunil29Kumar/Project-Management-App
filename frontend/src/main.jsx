import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppProvider.jsx'
import { Toaster } from 'sonner';

// 1. UploadThing ki CSS zaroor import karein
import "@uploadthing/react/styles.css";

createRoot(document.getElementById('root')).render(
    <AppProvider>
      <App />
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        offset={{ top: "25px", right: "20px" }}
      />
    </AppProvider>
)