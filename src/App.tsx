import { Flex, Text } from '@chakra-ui/react';

import CanvasController from './components/CanvasController';
import CanvasContainer from './components/CanvasContainer';
import { useImageSrc } from './state/image';
import './style.css';

const App = () => {
  const [imageSrc] = useImageSrc();

  return (
    <Flex w="full" h="full" direction="column">
      <CanvasController />
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="full"
        h="full"
      >
        {imageSrc ? (
          <CanvasContainer imageSrc={imageSrc} />
        ) : (
          <Flex h="100vh" w="full" alignItems="center" justifyContent="center">
            <Text> Upload an image</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default App;
