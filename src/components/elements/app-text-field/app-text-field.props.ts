import { ReactNode } from 'react'
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

interface AppTextFieldProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  style?: StyleProp<TextStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  hasError?: boolean,
  type?: 'text' | 'password',
  helperText?: string,
  isDisabled?: boolean,
  autoCapitalize?: TextInputProps['autoCapitalize'],
  autoComplete?: TextInputProps['autoComplete'],
  inputMode?: TextInputProps['inputMode'],
  placeholderColors?: {
    default: string,
    focused: string,
  },
  leftAdornment?: ReactNode | ((isFocused: boolean) => ReactNode),
  rightAdornment?: ReactNode,
}

export default AppTextFieldProps
