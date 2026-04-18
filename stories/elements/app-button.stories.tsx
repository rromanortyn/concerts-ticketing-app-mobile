import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { fn } from 'storybook/test'

import AppButton from '@/components/elements/app-button/app-button'
import { View } from 'react-native'

const meta = {
  title: 'Elements/Button',
  component: AppButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: { onPress: fn() },
} satisfies Meta<typeof AppButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'primary',
    title: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
    title: 'Button',
  },
}

export const Text: Story = {
  args: {
    type: 'text',
    title: 'Button',
  },
}

export const Danger: Story = {
  args: {
    type: 'danger',
    title: 'Button',
  },
}
