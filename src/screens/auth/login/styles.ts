import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  safeAreaView: {
    height: Dimensions.get('screen').height,
  },
  container: {
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  keyboardAwareScrollView: {
    flex: 1,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
})

export default styles