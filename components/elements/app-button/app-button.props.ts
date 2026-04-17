import { ReactNode } from 'react'

const buttonTypes = [
  'primary',
  'secondary',
  'danger',
  'text',
] as const

const buttonStates = [
  'enabled',
  'disabled',
  'hovered',
  'pressed',
] as const

export type ButtonType = typeof buttonTypes[number]
export type ButtonState = typeof buttonStates[number]

interface AppButtonProps {
  title: string,
  onPress: () => void,
  type?: ButtonType,
  state?: ButtonState,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
}

export default AppButtonProps
