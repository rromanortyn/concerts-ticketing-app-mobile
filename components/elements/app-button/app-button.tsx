import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import AppButtonProps from './app-button.props'
import styles from './app-button.styles'

const AppButton: FC<AppButtonProps> = (props) => {
  const {
    title,
    onPress,
    type = 'primary',
    isDisabled = false,
  } = props

  return (
    <TouchableOpacity
      style={styles(type).touchableOpacity}
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles(type).text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton
