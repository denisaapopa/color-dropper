import { VStack } from '@chakra-ui/react';

import CanvasController from './components/CanvasController';
import CanvasColorDropper from './components/CanvasColorDropper';

const App = () => {
  return (
    <VStack>
      <CanvasController />
      <CanvasColorDropper />
    </VStack>
  );
};

export default App;
