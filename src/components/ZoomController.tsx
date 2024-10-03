import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

import { useScale } from '../state/scale';

const ZoomControl = () => {
  const [scale, setScale] = useScale();
  console.log(scale);
  return (
    <Box width="300px">
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
    </Box>
  );
};

export default ZoomControl;
