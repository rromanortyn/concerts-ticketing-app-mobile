import { Text } from 'react-native'

const getErrorMessageJsx = (message?: string) => {
  const jsx = message ? <Text style={{ color: 'red', fontSize: 12 }}>{message}</Text> : null

  return jsx
}

export default getErrorMessageJsx
