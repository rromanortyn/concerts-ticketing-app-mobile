import { ReactNode } from 'react'
import { StyleProp, TextInputProps, ViewStyle } from 'react-native'

interface AppTextFieldProps {
  placeholder: string,
  value: string,
  onChangeText: (text: string) => void,
  containerStyle?: StyleProp<ViewStyle>,
  hasError?: boolean,
  type?: 'text' | 'password',
  helperText?: string,
  isDisabled?: boolean,
  autoCapitalize?: TextInputProps['autoCapitalize'],
  autoComplete?: TextInputProps['autoComplete'],
  inputMode?: TextInputProps['inputMode'],
  leftAdornment?: ReactNode,
  rightAdornment?: ReactNode,
}

export default AppTextFieldProps
