import {
  FC,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View
} from 'react-native'

import { useQuery } from '@tanstack/react-query'
import {
  BellIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppTextField from '@/components/elements/app-text-field/app-text-field'
import AppTypography from '@/components/elements/app-typography/app-typography'
import axiosInstance from '@/consts/axios-instance'
import CitiesList from './components/cities-list/cities-list'
import EventsFilterBottomSheet from './components/events-filter-bottom-sheet/events-filter-bottom-sheet'
import { EventsFiltersState } from './components/events-filter-bottom-sheet/types'
import { createInitialEventsFiltersState } from './components/events-filter-bottom-sheet/utils'
import EventsSection from './components/events-section/events-section'

import styles from './styles'

const searchInputPlaceholderColors = {
  default: '#F9F9F9',
  focused: '#d4d4d4',
}

interface GetEventsResponseDto {
  items: {
    id: number,
    title: string,
    image: {
      src: string,
    },
    venue: {
      name: string,
    },
    city: {
      name: string,
    },
    startDate: Date,
  }[],
}

interface GetVenuesWithEventsResponseDto {
  items: {
    id: number,
    name: string,
    events: GetEventsResponseDto['items'],
  }[],
}

const HomeScreen: FC = () => {
  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [isCitiesListOpen, setIsCitiesListOpen] = useState<boolean>(false)
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState<boolean>(false)
  const [hasFilterBadge, setHasFilterBadge] = useState<boolean>(false)
  const [filters, setFilters] = useState<EventsFiltersState>(
    () => createInitialEventsFiltersState(),
  )
  const [search, setSearch] = useState<string>('')
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)
  const [isSearchInputVisible, setIsSearchInputVisible] = useState<boolean>(true)

  const searchInputRef = useRef<TextInput>(null)

  const stylesWithInsets = useMemo(() => styles({
    topInset: insets.top,
    windowDimensions,
  }), [
    insets.top,
    windowDimensions,
  ])

  const {
    data: cities = [],
    isFetching: isCitiesFetching,
  } = useQuery<{ id: number, name: string }[]>({
    queryKey: ['get-cities'],
    queryFn: async () => {
      const response = await axiosInstance.get('/cities')

      return response.data
    },
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

  useEffect(() => {
    if (cities && cities.length > 0) {
      setSelectedCityId(cities[0].id)
    }
  }, [cities])

  const {
    data: venues = [],
    isFetching: isVenuesFetching,
  } = useQuery<{ id: number, name: string }[]>({
    queryKey: ['get-venues-by-city', selectedCityId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/venues/all?cityId=${selectedCityId}`)

      return response.data
    },
    enabled: !!selectedCityId,
  })

  const {
    data: popularEventsData,
    isFetching: isPopularEventsFetching,
  } = useQuery<GetEventsResponseDto>({
    queryKey: ['get-popular-events', selectedCityId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/events/popular?cityId=${selectedCityId}`)

      return response.data
    },
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })


  const {
    data: genres = [],
    isFetching: isGenresFetching,
  } = useQuery<{ id: number, name: string }[]>({
    queryKey: ['get-genres'],
    queryFn: async () => {
      const response = await axiosInstance.get('/genres')

      return response.data
    },
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

  const {
    data: venuesWithEvents,
    isFetching: isVenuesWithEventsFetching,
  } = useQuery<GetVenuesWithEventsResponseDto>({
    queryKey: ['get-venues-with-events', selectedCityId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/venues?cityId=${selectedCityId}`)

      return response.data
    },
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

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
    setFilters(createInitialEventsFiltersState(values))
    setHasFilterBadge(isChanged)
    console.log('Applied filters:', values, 'Is changed:', isChanged)
  }

  const onCityChange = (id: number) => {
    setSelectedCityId(id)
    setIsCitiesListOpen(false)
  }

  useEffect(() => {
    setIsSearchInputVisible(!isCitiesListOpen)
  }, [isCitiesListOpen])

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
          onItemPress={(id) => onCityChange(id)}
        />
      </View>
    </TouchableWithoutFeedback>
  ) : null

  const selectedCityName = cities?.find((city) => city.id === selectedCityId)?.name || ''

  const venuesSectionsJsx = isVenuesWithEventsFetching ? (
    <View style={stylesWithInsets.sectionLoaderContainer}>
      <ActivityIndicator size={96} color='#3C896D' />
    </View>
  ) : venuesWithEvents?.items.map((venue) => (
    <EventsSection
      key={venue.id}
      title={venue.name}
      isEventsFetching={false}
      events={venue.events.map((event) => ({
        ...event,
        venue,
      }))}
    />
  ))

  if (isCitiesFetching) {
    return <ActivityIndicator style={{ flex: 1 }} size={96} color='#3C896D' />
  }

  return (
    <>
      <View style={stylesWithInsets.container}>
        <View style={stylesWithInsets.headerOuterContainer}>
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
                  text={selectedCityName}
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
                {isSearchInputVisible ? (
                  <AppTextField
                    ref={searchInputRef}
                    style={stylesWithInsets.searchInputText}
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
                    leftAdornmentContainerStyle={stylesWithInsets.searchInputLeftAdornmentContainer}
                    onChangeText={onSearchChange}
                  />) : (
                    <View style={{ flex: 1, padding: 20, height: 66 }} />
                  )}
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
        </View>
        {citiesListJsx}

        <ScrollView
          style={stylesWithInsets.eventsScrollView}
          contentContainerStyle={stylesWithInsets.eventsScrollContent}
        >
          <EventsSection
            title='Upcoming events'
            isEventsFetching={isPopularEventsFetching}
            events={popularEventsData?.items ?? []}
          />

          {venuesSectionsJsx}
        </ScrollView>
      </View>

      {isFiltersSheetOpen && Platform.OS === 'android' ? (
        <View style={stylesWithInsets.filtersSheetOverlay}>
          <EventsFilterBottomSheet
            isLoading={isGenresFetching || isVenuesFetching}
            genres={genres}
            venues={venues}
            isVisible={isFiltersSheetOpen}
            initialValues={filters}
            onApply={onFiltersApply}
            onDismiss={onFiltersDismiss}
          />
        </View>
      ) : null}
    </>
  )
}

export default HomeScreen
