import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { FirebaseContextProvider } from './context/FirebaseContext.jsx';
import { BrowserRouter } from 'react-router-dom';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseContextProvider>
        <App />
        <ToastContainer />
      </FirebaseContextProvider>
    </BrowserRouter>
  </StrictMode>
);
