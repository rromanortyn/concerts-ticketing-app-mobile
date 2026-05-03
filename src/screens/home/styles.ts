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
    height: 220,
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
    marginBottom: 24,
  },
  citySelectorPressableContainer: {
    alignItems: 'center',
    gap: 4,
  },
  citySelectorTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  citySelectorSubtitle: {
    marginRight: 4,
    textAlign: 'center',
    color: 'white',
  },
  citySelectorH3: {
    textAlign: 'center',
    color: 'white',
  },
  citiesList: {
    maxHeight: windowDimensions.height * 0.65,
    width: windowDimensions.width * 0.8, 
    backgroundColor: '#F9F9F9', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#999', 
    position: 'absolute', 
    top: 130,
    left: windowDimensions.width * 0.1, 
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