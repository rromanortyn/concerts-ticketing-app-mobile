import { forwardRef, useMemo } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import AppButtonProps from './app-button.props'
import styles from './styles'

const AppButton = forwardRef<View, AppButtonProps>((props, ref) => {
  const {
    title,
    onPress,
    leftIcon,
    rightIcon,
    style,
    intent = 'primary',
    variant = 'filled',
    isDisabled = false,
  } = props

  const stylesMemo = useMemo(
    () => styles({ intent, variant, isDisabled }),
    [
      intent,
      variant,
      isDisabled,
    ],
  )

  return (
    <TouchableOpacity
      ref={ref}
      style={[
        stylesMemo.touchableOpacity,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={stylesMemo.leftIconContainer}>
        {leftIcon}
      </View>
      <Text style={stylesMemo.text}>{title}</Text>
      <View style={stylesMemo.rightIconContainer}>
        {rightIcon}
      </View>
    </TouchableOpacity>
  )
})

export default AppButton
