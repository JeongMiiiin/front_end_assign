import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/browsers.ts';

if (process.env.NODE_ENV === "development") worker.start();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
