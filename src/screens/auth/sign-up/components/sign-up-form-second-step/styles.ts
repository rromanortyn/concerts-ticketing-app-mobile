import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  safeAreaView: {
    height: Dimensions.get('screen').height,
  },
  container: {
    height: '100%',
  },
  keyboardAwareScrollView: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginRight: 4,
    marginBottom: 20,
  },
  titleUp: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    color: '#3C896D',
  },
  bottomContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formFieldContainer: {
    marginBottom: 20,
  },
  formFieldLabel: {
    marginBottom: 8,
  },
  formFieldInput: {
    marginBottom: 8,
  },
  icon: {
    marginLeft: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  goBackButton: {
    marginBottom: 20,
  },
})

export default styles