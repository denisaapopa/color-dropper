import React from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  return (
    <Flex direction="column">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="file-upload"
        display="none"
      />
      <label htmlFor="file-upload">
        <Button as="span" colorScheme="teal" size="md">
          Upload Image
        </Button>
      </label>
    </Flex>
  );
};

export default ImageUploader;
