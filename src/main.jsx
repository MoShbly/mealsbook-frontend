import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactContextProvider from './context.jsx';

createRoot(document.getElementById('root')).render(
  <ReactContextProvider>
    <App />
  </ReactContextProvider>,
)
