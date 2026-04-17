import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import AppButtonProps from './app-button.props'
import styles from './app-button.styles'

const AppButton: FC<AppButtonProps> = (props) => {
  const {
    title,
    onPress,
    type = 'primary',
  } = props

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles(type).touchableOpacity}
      onPress={onPress}
    >
      <Text style={styles(type).text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton
