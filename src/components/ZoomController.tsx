import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';

import { useScale } from '../state/scale';

const ZoomControl = () => {
  const [scale, setScale] = useScale();

  return (
    <Flex width="300px" gap={4}>
      <Slider
        aria-label="Zoom"
        value={scale * 100}
        min={30}
        max={300}
        onChange={(value) => setScale(value / 100)}
        step={1}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button
        onClick={() => setScale(1)}
        as="span"
        colorScheme="teal"
        size="sm"
      >
        <Text>Reset</Text>
      </Button>
    </Flex>
  );
};

export default ZoomControl;
