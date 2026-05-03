import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

const buttonIntents = [
  'primary',
  'danger',
] as const

const buttonVariants = [
  'filled',
  'outlined',
] as const

export type ButtonIntent = typeof buttonIntents[number]
export type ButtonVariant = typeof buttonVariants[number]

interface AppButtonProps {
  title: string,
  onPress: () => void,
  intent?: ButtonIntent,
  variant?: ButtonVariant,
  isDisabled?: boolean,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
  style?: StyleProp<ViewStyle>,
}

export default AppButtonProps
