import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
} from '@chakra-ui/react';

import { useScale } from '../state/scale';

const MIN_SCALE = 0.3;
const MAX_SCALE = 3;
const UNIT = 100;

const ZoomControl = () => {
  const [scale, setScale] = useScale();
  return (
    <Flex width="200px">
      <Slider
        aria-label="Zoom"
        value={scale * UNIT}
        min={MIN_SCALE * UNIT}
        max={MAX_SCALE * UNIT}
        onChange={(value) => setScale(value / UNIT)}
        step={1}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
};

export default ZoomControl;
