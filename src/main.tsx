import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { CompareProvider } from './context/CompareContext';
import { reportCompanionDataQuality } from './data/companionDataQuality';
import { registerServiceWorker } from './pwa';
import './index.css';

if (import.meta.env.DEV) {
  reportCompanionDataQuality();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

registerServiceWorker();
