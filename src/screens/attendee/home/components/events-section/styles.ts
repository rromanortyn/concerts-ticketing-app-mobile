import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  sectionHeaderContainer: {
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
  emptyEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyEventsImage: {
    width: 300,
    height: 300,
    marginBottom: 12,
  },
  emptyEventsTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyEventsDescription: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyEventsHint: {
    textAlign: 'center',
  },
})

export default styles
