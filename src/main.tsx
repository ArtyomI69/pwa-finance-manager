import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import './app/styles/index.css';

import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

const container = document.querySelector('#root') as HTMLElement;

const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
