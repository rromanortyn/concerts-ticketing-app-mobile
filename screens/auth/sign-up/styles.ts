import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#ece8e8',
    height: '100%',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
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
  bottomContainer: {
    height: 'auto',
    marginBottom: 35,
  },
  
})

export default styles