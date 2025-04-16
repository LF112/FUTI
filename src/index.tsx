import { createRoot } from 'react-dom/client';

import 'normalize.css';
import '@/styles/index.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
