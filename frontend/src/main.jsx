import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './API/Account/Auth/AuthProvider.jsx';
import { ListsModalProvider } from './API/Lists/Modal/Context/ListsModalProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListsModalProvider>
          <App />
        </ListsModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
