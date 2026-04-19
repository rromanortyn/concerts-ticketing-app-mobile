import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { fn } from 'storybook/test'

import AppTextField from '@/components/elements/app-text-field/app-text-field'
import { View } from 'react-native'
import { useArgs } from 'storybook/internal/preview-api'

const meta = {
  title: 'Elements/TextField',
  component: AppTextField,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: { onChangeText: fn() },
} satisfies Meta<typeof AppTextField>

export default meta

type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text',
    value: 'lol',
  },
  render(args) {
    const [{ value }, updateArgs] = useArgs()
 
    const onChange = (text: string) => {
      updateArgs({ value: text })
    }
 
    return (
      <AppTextField {...args} value={value} onChangeText={onChange} />
    )
  },
}
