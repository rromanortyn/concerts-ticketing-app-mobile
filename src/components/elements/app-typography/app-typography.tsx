import { FC } from 'react'
import { Text } from 'react-native'

import AppTypographyProps from './app-typography.props'
import styles from './styles'

const AppTypography: FC<AppTypographyProps> = (props) => {
  const {
		text,
		variant,
		style,
    numberOfLines = 2,
	} = props

  return (
		<Text numberOfLines={numberOfLines} style={[styles[variant], style]}>{text}</Text>
	)
}

export default AppTypography
