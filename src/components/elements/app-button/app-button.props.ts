import { ReactNode } from 'react'

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
}

export default AppButtonProps
