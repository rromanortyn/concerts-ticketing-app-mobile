import { StyleProp, TextStyle } from 'react-native'

interface AppTypographyProps {
  text: string,
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'subtitle',
  style?: StyleProp<TextStyle>,
  numberOfLines?: number,
}

export default AppTypographyProps