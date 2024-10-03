import { Flex } from '@chakra-ui/react';

import CanvasController from './components/CanvasController';
import CanvasColorDropper from './components/CanvasColorDropper';

const App = () => {
  return (
    <Flex w="full" h="full" direction="column">
      <CanvasController />
      <CanvasColorDropper />
    </Flex>
  );
};

export default App;
