import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionLoaderContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 40,
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
