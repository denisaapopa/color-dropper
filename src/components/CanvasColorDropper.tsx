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
      position="relative"
      w="full"
      h="full"
      ref={containerRef}
    >
      {imageSrc ? (
        <Canvas imageSrc={imageSrc} />
      ) : (
        <Flex>
          <Text> Upload an image</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default CanvasColorDropper;
