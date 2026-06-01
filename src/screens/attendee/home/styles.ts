import { StyleSheet } from 'react-native'

interface Props {
  bottomInset: number,
  topInset: number,
  windowDimensions: {
    height: number,
    width: number,
  },
}

const styles = ({ bottomInset, topInset, windowDimensions }: Props) => StyleSheet.create({
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
  filterButton: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    borderWidth: 1,
    borderColor: '#F9F9F9',
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
  filtersSheetContainer: {
    flex: 1,
    minHeight: windowDimensions.height * 0.55,
    maxHeight: windowDimensions.height * 0.88,
    backgroundColor: '#F9F9F9',
    paddingTop: 16,
  },
  filtersSheetHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  filtersSheetSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  filtersScrollView: {
    flex: 1,
  },
  filtersScrollContent: {
    gap: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  filterSection: {
    gap: 12,
  },
  filterChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  filterChipSelected: {
    backgroundColor: '#3C896D',
    borderColor: '#3C896D',
  },
  filterChipText: {
    color: '#222',
  },
  filterChipTextSelected: {
    color: '#F9F9F9',
  },
  customDatesContainer: {
    gap: 12,
  },
  customDateButton: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    gap: 4,
  },
  customDateLabel: {
    color: '#666',
  },
  venuesList: {
    gap: 14,
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#3C896D',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#3C896D',
  },
  filtersFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: bottomInset + 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#F9F9F9',
  },
})

export default styles
