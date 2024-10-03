import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { CopyIcon } from '../assets/Copy';

const DisplayColor = ({
  color,
  onCopy,
  label,
}: {
  color?: string;
  onCopy: () => void;
  label: string;
}) => {
  if (color) {
    return (
      <Tooltip label={label} aria-label={`${label} tooltip`}>
        <Flex
          onClick={onCopy}
          cursor="pointer"
          alignItems="center"
          gap={2}
          p={2}
          bg="gray.50"
          borderRadius="md"
          _hover={{ bg: 'gray.100', boxShadow: 'md' }}
          transition="background-color 0.2s ease, box-shadow 0.2s ease"
        >
          <CopyIcon fill="black" />
          <Text fontSize={{ base: 'sm', md: 'md' }}>{color}</Text>
        </Flex>
      </Tooltip>
    );
  }
  return null;
};

export default DisplayColor;
