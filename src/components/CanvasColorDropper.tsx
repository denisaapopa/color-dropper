import React, { useRef } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useImageSrc } from '../state/image';

import './../style.css';

import Canvas from './Canvas';

const CanvasColorDropper: React.FC = () => {
  const [imageSrc] = useImageSrc();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="full"
      h="full"
      ref={containerRef}
    >
      {imageSrc ? (
        <Canvas imageSrc={imageSrc} />
      ) : (
        <Flex h="100vh" w="full" alignItems="center" justifyContent="center">
          <Text> Upload an image</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default CanvasColorDropper;
