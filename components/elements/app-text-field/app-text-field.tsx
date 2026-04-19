import {
  forwardRef,
  RefObject,
  useMemo,
  useState
} from 'react'
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import AppTextFieldProps from './app-text-field.props'
import styleSheet from './app-text-field.styles'

const AppTextField = forwardRef<TextInput, AppTextFieldProps>((props, ref) => {
  const {
    placeholder,
    value,
    onChangeText,
    type = 'primary',
    isDisabled = false,
    containerStyle,
    leftAdornment,
    rightAdornment,
  } = props

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const styles = useMemo(() => styleSheet(isFocused), [isFocused])

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onPress = () => {
    (ref as RefObject<TextInput>)?.current?.focus()
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, containerStyle]}
      >
        {leftAdornment}
        <TextInput
          ref={ref}
          style={styles.textInput}
          secureTextEntry={type === 'password'}
          autoFocus={false}
          editable={!isDisabled}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? '#AFAFAF' : '#605e5e'}
          autoCorrect={false}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {rightAdornment}
      </View>
    </TouchableWithoutFeedback>
  )
})

export default AppTextField
