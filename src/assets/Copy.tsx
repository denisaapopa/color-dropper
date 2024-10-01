import { createIcon } from '@chakra-ui/icon';

export const CopyIcon = createIcon({
  displayName: 'CopyIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: '#F3F3F3',
  },
  path: [
    <path
      key="0"
      fillRule="evenodd"
      d="M11 9.75c-.69 0-1.25.56-1.25 1.25v9c0 .69.56 1.25 1.25 1.25h9c.69 0 1.25-.56 1.25-1.25v-9c0-.69-.56-1.25-1.25-1.25h-9ZM8.25 11A2.75 2.75 0 0 1 11 8.25h9A2.75 2.75 0 0 1 22.75 11v9A2.75 2.75 0 0 1 20 22.75h-9A2.75 2.75 0 0 1 8.25 20v-9Z"
      clipRule="evenodd"
    />,
    <path
      key="1"
      fillRule="evenodd"
      d="M4 2.75A1.25 1.25 0 0 0 2.75 4v9A1.25 1.25 0 0 0 4 14.25h1a.75.75 0 0 1 0 1.5H4A2.75 2.75 0 0 1 1.25 13V4A2.75 2.75 0 0 1 4 1.25h9A2.75 2.75 0 0 1 15.75 4v1a.75.75 0 0 1-1.5 0V4A1.25 1.25 0 0 0 13 2.75H4Z"
      clipRule="evenodd"
    />,
  ],
});
