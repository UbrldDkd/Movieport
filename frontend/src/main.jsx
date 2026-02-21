// React router
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// CSS
import './index.css';
import './components.css';

// Providers
import { AuthProvider } from './api/account/auth/AuthProvider.jsx';
import { ListsModalProvider } from './api/lists/Modal/Context/ListsModalProvider.jsx';
import { AuthModalProvider } from './api/account/auth/Modal/Context/AuthModalProvider.jsx';

// Components
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListsModalProvider>
          <AuthModalProvider>
            <App />
          </AuthModalProvider>
        </ListsModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
