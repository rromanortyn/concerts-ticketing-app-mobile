import { StyleSheet } from 'react-native'

interface Props {
  topInset: number,
  windowDimensions: {
    height: number,
    width: number,
  },
}

const styles = ({ topInset, windowDimensions }: Props) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    height: 200,
    backgroundColor: '#3C896D',
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  topContainer: {
    marginTop: topInset + 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  citySelectorPressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  citySelectorH3: {
    textAlign: 'center',
    color: 'white',
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  citiesListContainer: {
    width: windowDimensions.width,
    height: windowDimensions.height,
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  citiesList: {
    maxHeight: windowDimensions.height * 0.65,
    width: windowDimensions.width * 0.8,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    position: 'absolute',
    top: 120,
    left: 20,
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
    backgroundColor: 'transparent',
  },
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventsListContainer: {
    gap: 16,
    paddingHorizontal: 20,
  },
})

export default styles
