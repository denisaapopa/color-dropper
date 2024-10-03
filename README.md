# Color Dropper

A web-based tool that allows users to upload images, zoom, drag, reset to default, and use a color dropper to select a color. The selected color can be copied to the clipboard as a hex code.

## Features

- **Image Upload**: Upload an image to the canvas and interact with it.
- **Zoom and Drag**: Easily zoom in and out of the image and drag it around the canvas.
- **Color Picker**: Activate the color picker tool to select any color on the image.
- **Reset Image**: Restore the image to its original state.
- **Copy Color**: Copy the selected color's hex code to the clipboard from the top bar.

## Tech Stack

- **Vite**: Fast and modern build tool optimized for front-end development.
- **React**: JavaScript library for building interactive UIs.
- **TypeScript**: Typed superset of JavaScript that adds static types.
- **Chakra UI**: Simple, modular, and accessible component library for React.
- **Recoil**: State management for React applications.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/color-dropper.git
   cd color-dropper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the project locally:
   ```bash
   npm run dev
   ```

   This will start the Vite development server, and you can access the application at `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the code using ESLint.
- `npm run format`: Formats the code using Prettier.

## How to Use

1. **Upload an Image**: Drag and drop an image or click the upload button to load your image onto the canvas.
2. **Zoom and Drag**: Scroll to zoom in and out. Click and drag to move the image around the canvas.
3. **Reset Image**: Click the reset button to restore the image to its default size and position.
4. **Activate Color Picker**: Toggle the color picker to hover over the image and select a color.
5. **Copy Color**: The selected color’s hex code will appear in the top bar. Click the button to copy it to your clipboard.

## Dependencies

- `@chakra-ui/react`: For the user interface components.
- `react`, `react-dom`: Core libraries for the React application.
- `recoil`: For state management.
- `@emotion/react`, `@emotion/styled`: For CSS-in-JS styling.
- `framer-motion`: For animations and interactions.

