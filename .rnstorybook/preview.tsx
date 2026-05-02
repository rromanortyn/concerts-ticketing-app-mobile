import type { Preview } from '@storybook/react-native'

const preview: Preview = {
  parameters: {
    darkMode: {
      current: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
