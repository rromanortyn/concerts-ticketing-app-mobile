import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import AppTypography from '@/components/elements/app-typography/app-typography'
import CitySuggestionProps from './city-suggestion.props'
import styles from './styles'

const CitySuggestion: FC<CitySuggestionProps> = (props) => {
  const { name, hasDivider = true, onPress } = props

  const dividerJsx = hasDivider ? (
    <View style={styles.suggestionDivider} />
  ) : null

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cityNameContainer}>
        <AppTypography variant='h3' style={styles.cityNameText} text={name} />
      </View>

      {dividerJsx}
    </TouchableOpacity>
  )
}

export default CitySuggestion
