import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

interface AppTextFieldProps {
  placeholder: string,
  value: string,
  onChangeText: (text: string) => void,
  containerStyle?: StyleProp<ViewStyle>,
  hasError?: boolean,
  type?: 'text' | 'password',
  helperText?: string,
  isDisabled?: boolean,
  leftAdornment?: ReactNode,
  rightAdornment?: ReactNode,
}

export default AppTextFieldProps
