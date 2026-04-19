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
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
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
  },
  titleUp: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    color: '#3C896D',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 32,
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
})

export default styles