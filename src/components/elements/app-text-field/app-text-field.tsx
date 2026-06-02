import {
  forwardRef,
  RefObject,
  useMemo,
  useState,
} from 'react'
import {
  GestureResponderEvent,
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
    autoCapitalize = 'none',
    autoComplete = 'off',
    inputMode = 'text',
    placeholderColors = {
      default: '#605E5E',
      focused: '#AFAFAF',
    },
    style,
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

  const onRightAdornmentPress = (event: GestureResponderEvent) => {
    event.stopPropagation()
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, containerStyle]}
      >
        <View style={styles.leftAdornmentContainer}>
          {typeof leftAdornment === 'function' ? leftAdornment(isFocused) : leftAdornment}
        </View>
        <TextInput
          ref={ref}
          style={[styles.textInput, style]}
          secureTextEntry={type === 'password'}
          autoFocus={false}
          editable={!isDisabled}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? placeholderColors.focused : placeholderColors.default}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <TouchableWithoutFeedback onPress={onRightAdornmentPress}>
          <View style={styles.rightAdornmentContainer}>
            {rightAdornment}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
})

export default AppTextField
