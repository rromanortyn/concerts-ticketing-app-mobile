import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    height: 'auto',
    marginBottom: 35,
  },
  title: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  createAnAccountButton: {
    marginBottom: 20,
  },
  loginButton: {
    marginBottom: 20,
  },
  openStorybookText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#3C896D',
  },
})

export default styles
