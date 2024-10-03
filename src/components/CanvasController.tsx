import { Button, Flex, useClipboard, Box, Tooltip } from '@chakra-ui/react';
import { ColorPickerIcon } from '../assets/ColorPickerIcon';
import { useColor } from '../state/color';
import { usePickColor } from '../state/pickColor';
import ImageUploader from './ImageUploader';
import { useImageSrc } from '../state/image';
import DisplayColor from './DisplayColor';
import ZoomControl from './ZoomController';
import { useScale } from '../state/scale';
import { useDrag } from '../state/drag';
import { useOffset } from '../state/offset';

const CanvasController = () => {
  const [color, setColor] = useColor();
  const [, setScale] = useScale();
  const [, setDrag] = useDrag();
  const [, setOffset] = useOffset();

  const [colorDropperActive, setIsColorDropperActive] = usePickColor();
  const { onCopy: onCopyHex } = useClipboard(color ?? '');
  const [imageSrc, setImageSrc] = useImageSrc();

  const canPickColor = imageSrc !== null;

  const handlePickColorMode = () => {
    if (canPickColor) {
      setIsColorDropperActive(!colorDropperActive);
    }
  };

  const handleImageUpload = (url: string) => {
    resetControllerState();
    setImageSrc(url);
  };

  const resetControllerState = () => {
    setDrag({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });

    setScale(1);
    setIsColorDropperActive(false);
    setColor(undefined);
  };

  return (
    <Flex
      alignItems="center"
      w="full"
      flexWrap="wrap"
      gap={{ base: 4, md: 6 }}
      justifyContent="space-between"
      p={4}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
    >
      <Tooltip label="Pick a color" aria-label="Pick a color tooltip">
        <Button
          variant="solid"
          borderRadius="full"
          w={14}
          h={14}
          onClick={handlePickColorMode}
          isActive={colorDropperActive}
          isDisabled={!canPickColor}
          border={`2px solid ${colorDropperActive ? 'purple.500' : 'teal.500'}`}
          _hover={{
            borderColor: colorDropperActive ? 'purple.400' : 'teal.400',
            transform: 'scale(1.1)',
          }}
          _active={{
            transform: 'scale(1.05)',
            bg: colorDropperActive ? 'purple.100' : 'teal.100',
          }}
          _disabled={{ borderColor: 'gray.400', bg: 'gray.200' }}
        >
          <ColorPickerIcon color={colorDropperActive ? 'purple' : 'teal'} />
        </Button>
      </Tooltip>

      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        gap={6}
        flexWrap="wrap"
        maxW={{ base: '100%', md: '60%' }}
        position="relative"
      >
        {color && (
          <Box
            w={12}
            h={12}
            bg={color}
            borderRadius="md"
            border="2px solid"
            borderColor="gray.300"
            boxShadow="md"
          />
        )}

        <DisplayColor color={color} onCopy={onCopyHex} label="Copy HEX" />
        {imageSrc ? <ZoomControl /> : null}
      </Flex>

      <Box>
        <ImageUploader onImageUpload={handleImageUpload} />
      </Box>
    </Flex>
  );
};

export default CanvasController;
