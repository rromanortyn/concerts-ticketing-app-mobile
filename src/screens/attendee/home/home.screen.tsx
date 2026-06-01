import {
  FC,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View
} from 'react-native'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Host, ModalBottomSheet, RNHostView } from '@expo/ui/jetpack-compose'
import {
  BellIcon,
  BookmarkIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppButton from '@/components/elements/app-button/app-button'
import AppTypography from '@/components/elements/app-typography/app-typography'
import CitySuggestion from './components/city-suggestion/city-suggestion'
import EventCard from './components/event-card/event-card'

import AppTextField from '@/components/elements/app-text-field/app-text-field'
import styles from './styles'

const cities = [
  { id: 1, name: 'Kyiv' },
  { id: 2, name: 'Lviv' },
  { id: 3, name: 'Kharkiv' },
  { id: 4, name: 'Dnipro' },
  { id: 5, name: 'Odesa' },
  { id: 6, name: 'Kyiv' },
  { id: 7, name: 'Lviv' },
  { id: 8, name: 'Kharkiv' },
  { id: 9, name: 'Dnipro' },
  { id: 10, name: 'Odesa' },
]

const dateFilters = [
  'Today',
  'Tomorrow',
  'This week',
  'Custom dates',
] as const

const genres = [
  'Rock',
  'Pop',
  'Hip-Hop',
  'Jazz',
  'Classical',
  'Electronic',
  'Indie',
  'Country',
] as const

const venues = [
  'Stereo Plaza',
  'Atlas',
  'Caribbean Club',
  'Bel Etage',
  'VDNH Concert Hall',
  'Docker Pub',
  'October Palace',
] as const

const searchInputPlaceholderColors = {
  default: '#F9F9F9',
  focused: '#d4d4d4',
}

type DateFilter = typeof dateFilters[number]
type Genre = typeof genres[number]
type Venue = typeof venues[number]
type CustomDateField = 'from' | 'to'

interface FiltersState {
  date: DateFilter | null,
  genres: Genre[],
  venues: Venue[],
  customDates: {
    from: Date | null,
    to: Date | null,
  },
}

const initialFiltersState: FiltersState = {
  date: null,
  genres: [],
  venues: [],
  customDates: {
    from: null,
    to: null,
  },
}

const formatDate = (date: Date | null) => {
  if (!date) {
    return 'Select date'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const areFiltersActive = (filters: FiltersState) => (
  filters.date !== null
  || filters.genres.length > 0
  || filters.venues.length > 0
  || filters.customDates.from !== null
  || filters.customDates.to !== null
)

const HomeScreen: FC = () => {
  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [isCitiesListOpen, setIsCitiesListOpen] = useState<boolean>(false)
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState<boolean>(false)
  const [hasFilterBadge, setHasFilterBadge] = useState<boolean>(false)
  const [hasFilterChangesSinceOpen, setHasFilterChangesSinceOpen] = useState<boolean>(false)
  const [activeDatePickerField, setActiveDatePickerField] = useState<CustomDateField | null>(null)
  const [filters, setFilters] = useState<FiltersState>(initialFiltersState)
  const [search, setSearch] = useState<string>('')

  const searchInputRef = useRef<TextInput>(null)

  const stylesWithInsets = useMemo(() => styles({
    bottomInset: insets.bottom,
    topInset: insets.top,
    windowDimensions,
  }), [
    insets.bottom,
    insets.top,
    windowDimensions,
  ])

  const markFiltersChanged = () => {
    setHasFilterChangesSinceOpen(true)
  }

  const onCitiesToggle = () => {
    setIsCitiesListOpen((prev) => !prev)
  }

  const onSearchChange = (value: string) => {
    setSearch(value)
  }

  const onFiltersOpen = () => {
    if (Platform.OS !== 'android') {
      return
    }

    setHasFilterChangesSinceOpen(false)
    setIsFiltersSheetOpen(true)
  }

  const onFiltersDismiss = () => {
    setHasFilterBadge(hasFilterChangesSinceOpen && areFiltersActive(filters))
    setHasFilterChangesSinceOpen(false)
    setActiveDatePickerField(null)
    setIsFiltersSheetOpen(false)
  }

  const onDateFilterPress = (date: DateFilter) => {
    markFiltersChanged()
    setFilters((prev) => ({
      ...prev,
      date,
      customDates: date === 'Custom dates'
        ? prev.customDates
        : initialFiltersState.customDates,
    }))
  }

  const onGenrePress = (genre: Genre) => {
    markFiltersChanged()
    setFilters((prev) => {
      const isSelected = prev.genres.includes(genre)

      return {
        ...prev,
        genres: isSelected
          ? prev.genres.filter((item) => item !== genre)
          : [...prev.genres, genre],
      }
    })
  }

  const onVenuePress = (venue: Venue) => {
    markFiltersChanged()
    setFilters((prev) => {
      const isSelected = prev.venues.includes(venue)

      return {
        ...prev,
        venues: isSelected
          ? prev.venues.filter((item) => item !== venue)
          : [...prev.venues, venue],
      }
    })
  }

  const onCustomDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setActiveDatePickerField(null)

    if (event.type === 'dismissed' || !activeDatePickerField || !selectedDate) {
      return
    }

    markFiltersChanged()
    setFilters((prev) => ({
      ...prev,
      date: 'Custom dates',
      customDates: {
        ...prev.customDates,
        [activeDatePickerField]: selectedDate,
      },
    }))
  }

  const onResetFilters = () => {
    setFilters(initialFiltersState)
    setHasFilterBadge(false)
    setHasFilterChangesSinceOpen(false)
    setActiveDatePickerField(null)
  }

  const citySelectorChevronJsx = isCitiesListOpen ? (
    <ChevronUpIcon color='#F9F9F9' size={16} />
  ) : (
    <ChevronDownIcon color='#F9F9F9' size={16} />
  )

  const citiesListJsx = isCitiesListOpen ? (
    <TouchableWithoutFeedback onPress={onCitiesToggle}>
      <View style={stylesWithInsets.citiesListContainer}>
        <FlatList
          style={stylesWithInsets.citiesList}
          data={cities}
          renderItem={({ item, index }) => (
            <CitySuggestion
              name={item.name}
              hasDivider={index !== cities.length - 1}
              onPress={() => {}}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </TouchableWithoutFeedback>
  ) : null

  const datePickerJsx = activeDatePickerField ? (
    <DateTimePicker
      mode='date'
      value={filters.customDates[activeDatePickerField] ?? new Date()}
      display='default'
      onChange={onCustomDateChange}
    />
  ) : null

  return (
    <>
      <View style={stylesWithInsets.container}>
        <View style={stylesWithInsets.headerContainer}>
          <View style={stylesWithInsets.topContainer}>
            <TouchableOpacity
              style={stylesWithInsets.citySelectorPressableContainer}
              activeOpacity={0.7}
              onPress={onCitiesToggle}
            >
              <AppTypography
                variant='h3'
                style={stylesWithInsets.citySelectorH3}
                text='Kyiv, Ukraine'
              />

              {citySelectorChevronJsx}
            </TouchableOpacity>

            <View style={stylesWithInsets.rightContainer}>
              <BookmarkIcon color='#F9F9F9' size={32} />
              <BellIcon color='#F9F9F9' size={32} />
            </View>
          </View>

          <View style={stylesWithInsets.bottomContainer}>
            <View style={stylesWithInsets.searchContainer}>
              <AppTextField
                ref={searchInputRef}
                containerStyle={stylesWithInsets.searchInput}
                placeholder='Search...'
                placeholderColors={searchInputPlaceholderColors}
                value={search}
                autoComplete='off'
                inputMode='text'
                leftAdornment={(isFocused) => {
                  const color = isFocused ? searchInputPlaceholderColors.focused : searchInputPlaceholderColors.default

                  return (
                    <SearchIcon color={color} size={32} />
                  )
                }}
                onChangeText={onSearchChange}
              />
            </View>

            <TouchableOpacity
              style={stylesWithInsets.filterButton}
              activeOpacity={0.7}
              onPress={onFiltersOpen}
            >
              <FilterIcon color='#F9F9F9' size={32} />
              {hasFilterBadge ? <View style={stylesWithInsets.filterBadge} /> : null}
            </TouchableOpacity>
          </View>
        </View>

        {citiesListJsx}

        {/* This empty view is required for correct layout */}
        <View>
          <View style={stylesWithInsets.sectionHeaderContainer}>
            <AppTypography variant='h3' text='Upcoming events' />

            <TouchableOpacity style={stylesWithInsets.seeAllButton}>
              <AppTypography variant='subtitle' text='See all' />
              <ChevronRightIcon color='#000' size={16} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal contentContainerStyle={stylesWithInsets.eventsListContainer}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity key={item} activeOpacity={0.7}>
                <EventCard
                  containerWidth={windowDimensions.width * 0.7}
                  imageWidth={windowDimensions.width * 0.7 - 40}
                  imageHeight={windowDimensions.width * 0.7 - 40}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <Host matchContents>
        {isFiltersSheetOpen && Platform.OS === 'android' ? (
          <ModalBottomSheet
            onDismissRequest={onFiltersDismiss}
            skipPartiallyExpanded={false}
            showDragHandle
            containerColor='#F9F9F9'
          >
            <RNHostView matchContents>
              <View style={stylesWithInsets.filtersSheetContainer}>
                <View style={stylesWithInsets.filtersSheetHeader}>
                  <AppTypography variant='h2' text='Filters' />
                  <AppTypography
                    variant='subtitle'
                    style={stylesWithInsets.filtersSheetSubtitle}
                    text='Find events by date, genre, and venue.'
                  />
                </View>

                <ScrollView
                  style={stylesWithInsets.filtersScrollView}
                  contentContainerStyle={stylesWithInsets.filtersScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={stylesWithInsets.filterSection}>
                    <AppTypography variant='h3' text='Dates' />
                    <View style={stylesWithInsets.filterChipsContainer}>
                      {dateFilters.map((date) => {
                        const isSelected = filters.date === date

                        return (
                          <TouchableOpacity
                            key={date}
                            style={[
                              stylesWithInsets.filterChip,
                              isSelected && stylesWithInsets.filterChipSelected,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => onDateFilterPress(date)}
                          >
                            <AppTypography
                              variant='subtitle'
                              style={[
                                stylesWithInsets.filterChipText,
                                isSelected && stylesWithInsets.filterChipTextSelected,
                              ]}
                              text={date}
                            />
                          </TouchableOpacity>
                        )
                      })}
                    </View>

                    {filters.date === 'Custom dates' ? (
                      <View style={stylesWithInsets.customDatesContainer}>
                        {(['from', 'to'] as const).map((field) => (
                          <TouchableOpacity
                            key={field}
                            style={stylesWithInsets.customDateButton}
                            activeOpacity={0.7}
                            onPress={() => setActiveDatePickerField(field)}
                          >
                            <AppTypography
                              variant='subtitle'
                              style={stylesWithInsets.customDateLabel}
                              text={field === 'from' ? 'From' : 'To'}
                            />
                            <AppTypography
                              variant='subtitle'
                              text={formatDate(filters.customDates[field])}
                            />
                          </TouchableOpacity>
                        ))}
                        {datePickerJsx}
                      </View>
                    ) : null}
                  </View>

                  <View style={stylesWithInsets.filterSection}>
                    <AppTypography variant='h3' text='Genres' />
                    <View style={stylesWithInsets.filterChipsContainer}>
                      {genres.map((genre) => {
                        const isSelected = filters.genres.includes(genre)

                        return (
                          <TouchableOpacity
                            key={genre}
                            style={[
                              stylesWithInsets.filterChip,
                              isSelected && stylesWithInsets.filterChipSelected,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => onGenrePress(genre)}
                          >
                            <AppTypography
                              variant='subtitle'
                              style={[
                                stylesWithInsets.filterChipText,
                                isSelected && stylesWithInsets.filterChipTextSelected,
                              ]}
                              text={genre}
                            />
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </View>

                  <View style={stylesWithInsets.filterSection}>
                    <AppTypography variant='h3' text='Venues' />
                    <View style={stylesWithInsets.venuesList}>
                      {venues.map((venue) => {
                        const isSelected = filters.venues.includes(venue)

                        return (
                          <TouchableOpacity
                            key={venue}
                            style={stylesWithInsets.venueRow}
                            activeOpacity={0.7}
                            onPress={() => onVenuePress(venue)}
                          >
                            <View style={[
                              stylesWithInsets.checkbox,
                              isSelected && stylesWithInsets.checkboxSelected,
                            ]}>
                              {isSelected ? <CheckIcon color='#F9F9F9' size={14} /> : null}
                            </View>
                            <AppTypography variant='subtitle' text={venue} />
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </View>
                </ScrollView>

                <View style={stylesWithInsets.filtersFooter}>
                  <AppButton
                    title='Reset filters'
                    variant='outlined'
                    onPress={onResetFilters}
                  />
                </View>
              </View>
            </RNHostView>
          </ModalBottomSheet>
        ) : null}
      </Host>
    </>
  )
}

export default HomeScreen
