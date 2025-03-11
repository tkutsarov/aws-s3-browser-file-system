import { createRoot } from 'react-dom/client'
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router";

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
