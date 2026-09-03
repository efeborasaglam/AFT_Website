import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import './i18n.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './i18n/i18n.js'; // ganz oben, vor dem App-Import reicht

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>
);
