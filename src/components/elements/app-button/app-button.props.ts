import { ReactNode } from 'react'
import { TouchableOpacityProps } from 'react-native'

const buttonIntents = [
  'primary',
  'secondary',
  'danger',
] as const

const buttonVariants = [
  'filled',
  'outlined',
] as const

export type ButtonIntent = typeof buttonIntents[number]
export type ButtonVariant = typeof buttonVariants[number]

type AppButtonProps ={
  title: string,
  onPress: () => void,
  intent?: ButtonIntent,
  variant?: ButtonVariant,
  isDisabled?: boolean,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
} & TouchableOpacityProps

export default AppButtonProps
