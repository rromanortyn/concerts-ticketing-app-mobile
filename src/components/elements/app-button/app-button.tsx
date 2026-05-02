import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import AppButtonProps from './app-button.props'
import styles from './app-button.styles'

const AppButton: FC<AppButtonProps> = (props) => {
  const {
    title,
    onPress,
    leftIcon,
    rightIcon,
    type = 'primary',
    isDisabled = false,
  } = props

  return (
    <TouchableOpacity
      style={styles({ type, isDisabled }).touchableOpacity}
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles({ type, isDisabled }).leftIconContainer}>
        {leftIcon}
      </View>
      <Text style={styles({ type, isDisabled }).text}>{title}</Text>
      <View style={styles({ type, isDisabled }).rightIconContainer}>
        {rightIcon}
      </View>
    </TouchableOpacity>
  )
}

export default AppButton
