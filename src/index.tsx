import { createRoot } from 'react-dom/client';

import 'normalize.css';
import '@/styles/index.css';

import { App } from './app.tsx';

createRoot(document.getElementById('root')!).render(<App />);

console.clear();
console.log(
  '\n %c ⚡ FUTI  %c https://www.lf112.net %c BY LF112 (@futiwolf) \n\n',
  'color:#fff;background:#0091e4;padding:5px 0;border-radius:4px 0 0 4px',
  'background:#323842;padding:5px 0',
  'color:#fff;background:#505050;padding:5px 0;border-radius:0 4px 4px 0',
);
