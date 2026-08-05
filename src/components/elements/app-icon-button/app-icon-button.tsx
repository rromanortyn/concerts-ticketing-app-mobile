import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import styles from './styles'

type AppIconButtonProps = {
  name: keyof typeof Ionicons.glyphMap,
  onPress?: () => void,
} & React.ComponentProps<typeof Ionicons>

const AppIconButton: FC<AppIconButtonProps> = (props) => {
  const {
    name,
    onPress,
    size,
  } = props

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.buttonContentContainer}>
        <Ionicons name={name} size={size} color='#FFFFFF' />
      </View>
    </TouchableOpacity>
  )
}

export default AppIconButton
