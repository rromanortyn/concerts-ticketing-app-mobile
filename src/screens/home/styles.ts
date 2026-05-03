import { StyleSheet } from 'react-native'

const styles = (topInset: number) => StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: '#3C896D',
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    paddingHorizontal: 20,
  },
  topContainer: {
    marginTop: topInset + 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  locationPressableContainer: {
    alignItems: 'center',
    gap: 4,
  },
  locationTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationSubtitle: {
    marginRight: 4,
    textAlign: 'center',
    color: 'white',
  },
  locationH3: {
    textAlign: 'center',
    color: 'white',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  searchInput: {
    flex: 1,
  },
})

export default styles