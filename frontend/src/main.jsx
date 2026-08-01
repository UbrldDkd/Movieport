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
import { ReviewModalProvider } from './api/reviews/Modal/ReviewModalProvider.jsx';

// Components
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListsModalProvider>
          <ReviewModalProvider>
            <AuthModalProvider>
              <App />
            </AuthModalProvider>
          </ReviewModalProvider>
        </ListsModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
