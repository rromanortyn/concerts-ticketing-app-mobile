import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import AppTypography from '@/components/elements/app-typography/app-typography'
import CitySuggestionProps from './city-suggestion.props'

const CitySuggestion: FC<CitySuggestionProps> = (props) => {
  const { name, hasDivider = true, onPress } = props

  const dividerJsx = hasDivider ? (
    <View style={{ height: 1, backgroundColor: '#E0E0E0' }} />
  ) : null

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={{ padding: 20 }}>
        <AppTypography variant='h3' style={{ color: '#000' }} text={name} />
      </View>

      {dividerJsx}
    </TouchableOpacity>
  )
}

export default CitySuggestion
