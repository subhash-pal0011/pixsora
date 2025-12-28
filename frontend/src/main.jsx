import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { User } from './CONTEXT_API/User';
import { Provider } from 'react-redux';
import { Store } from './REDUX/Store';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={Store}>
      <User>
        <App />
        <Toaster />
      </User>
    </Provider>
  </BrowserRouter>
)
