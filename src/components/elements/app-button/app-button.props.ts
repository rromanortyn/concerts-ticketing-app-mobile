import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

const buttonTypes = [
  'primary',
  'secondary',
  'danger',
  'text',
] as const

export type ButtonType = typeof buttonTypes[number]

interface AppButtonProps {
  title: string,
  onPress: () => void,
  type?: ButtonType,
  isDisabled?: boolean,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
  style?: StyleProp<ViewStyle>,
}

export default AppButtonProps
