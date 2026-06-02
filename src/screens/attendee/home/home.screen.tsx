import {
  FC,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View
} from 'react-native'

import {
  BellIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppTextField from '@/components/elements/app-text-field/app-text-field'
import AppTypography from '@/components/elements/app-typography/app-typography'
import CitiesList from './components/cities-list/cities-list'
import EventCard from './components/event-card/event-card'
import EventsFilterBottomSheet, { EventsFiltersState } from './components/events-filter-bottom-sheet/events-filter-bottom-sheet'
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
  {
    id: 1,
    name: 'Rock',
  },
  {
    id: 2,
    name: 'Pop',
  },
  {
    id: 3,
    name: 'Hip-Hop',
  },
  {
    id: 4,
    name: 'Jazz',
  },
  {
    id: 5,
    name: 'Classical',
  },
  {
    id: 6,
    name: 'Electronic',
  },
  {
    id: 7,
    name: 'Indie',
  },
  {
    id: 8,
    name: 'Country',
  },
]

const venues = [
  {
    id: 1,
    name: 'Stereo Plaza',
  },
  {
    id: 2,
    name: 'Atlas',
  },
  {
    id: 3,
    name: 'Caribbean Club',
  },
  {
    id: 4,
    name: 'Bel Etage',
  },
  {
    id: 5,
    name: 'VDNH Concert Hall',
  },
  {
    id: 6,
    name: 'Docker Pub',
  },
  {
    id: 7,
    name: 'October Palace',
  },
]

const searchInputPlaceholderColors = {
  default: '#F9F9F9',
  focused: '#d4d4d4',
}

const HomeScreen: FC = () => {
  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [isCitiesListOpen, setIsCitiesListOpen] = useState<boolean>(false)
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState<boolean>(false)
  const [hasFilterBadge, setHasFilterBadge] = useState<boolean>(false)
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

    setIsFiltersSheetOpen(true)
  }

  const onFiltersDismiss = () => {
    setIsFiltersSheetOpen(false)
  }

  const onFiltersApply = (
    values: EventsFiltersState,
    isChanged: boolean,
  ) => {
    setHasFilterBadge(isChanged)
    console.log('Applied filters:', values, 'Is changed:', isChanged)
  }

  const citySelectorChevronJsx = isCitiesListOpen ? (
    <ChevronUpIcon color='#F9F9F9' size={16} />
  ) : (
    <ChevronDownIcon color='#F9F9F9' size={16} />
  )

  const citiesListJsx = isCitiesListOpen ? (
    <TouchableWithoutFeedback onPress={onCitiesToggle}>
      <View style={stylesWithInsets.citiesListContainer}>
        <CitiesList
          items={cities}
          onItemPress={(id) => {
            console.log('Selected city ID:', id)
          }}
        />
      </View>
    </TouchableWithoutFeedback>
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
                  const color = isFocused
                    ? searchInputPlaceholderColors.focused
                    : searchInputPlaceholderColors.default

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

              {hasFilterBadge ? (
                <View style={stylesWithInsets.filterBadge} />
              ) : null}
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

          <ScrollView
            horizontal
            contentContainerStyle={stylesWithInsets.eventsListContainer}
          >
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

      {isFiltersSheetOpen && Platform.OS === 'android' ? (
        <View style={stylesWithInsets.filtersSheetOverlay}>
          <EventsFilterBottomSheet
            genres={genres}
            venues={venues}
            isVisible={isFiltersSheetOpen}
            onApply={onFiltersApply}
            onDismiss={onFiltersDismiss}
          />
        </View>
      ) : null}
    </>
  )
}

export default HomeScreen
