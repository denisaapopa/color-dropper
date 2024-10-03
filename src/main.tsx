import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>,
);
