import { Button, Flex, useClipboard, Box, Tooltip } from '@chakra-ui/react';

import { ColorPickerIcon } from '../assets/ColorPickerIcon';
import { useColor } from '../state/color';
import { usePickColor } from '../state/pickColor';
import ImageUploader from './ImageUploader';
import { useImageSrc } from '../state/image';
import DisplayColor from './DisplayColor';

const CanvasController = () => {
  const [color] = useColor();
  const [colorDropperActive, setIsColorDropperActive] = usePickColor();
  const { onCopy: onCopyHex } = useClipboard(color?.hexColor ?? '');
  const { onCopy: onCopyRgb } = useClipboard(color?.rgbColor ?? '');
  const [imageSrc, setImageSrc] = useImageSrc();

  const canPickColor = imageSrc !== null;

  const handlePickColorMode = () => {
    if (canPickColor) {
      setIsColorDropperActive(!colorDropperActive);
    }
  };

  const handleImageUpload = (url: string) => {
    setImageSrc(url);
  };

  return (
    <Flex
      alignItems="center"
      w="full"
      flexWrap="wrap"
      gap={{ base: 4, md: 6 }}
      justifyContent="space-between"
      p={4}
      bg="gray.100"
      borderRadius="lg"
      boxShadow="md"
    >
      <Tooltip label="Pick a color" aria-label="Pick a color tooltip">
        <Button
          variant="solid"
          borderRadius="50%"
          w="12"
          h="12"
          onClick={handlePickColorMode}
          isActive={colorDropperActive}
          isDisabled={!canPickColor}
          border={`2px solid ${colorDropperActive ? 'purple' : 'teal'}`}
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
        {color?.hexColor && (
          <Box
            w={10}
            h={10}
            bg={color.hexColor}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.300"
          />
        )}

        <DisplayColor
          color={color?.rgbColor}
          onCopy={onCopyRgb}
          label="Copy RGB"
        />
        <DisplayColor
          color={color?.hexColor}
          onCopy={onCopyHex}
          label="Copy HEX"
        />
      </Flex>

      <Box>
        <ImageUploader onImageUpload={handleImageUpload} />
      </Box>
    </Flex>
  );
};
export default CanvasController;
