import {
  FC,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
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

const searchInputPlaceholderColors = {
  default: '#F9F9F9',
  focused: '#d4d4d4',
}

const HomeScreen: FC = () => {
  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [isCitiesListOpen, setIsCitiesListOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const searchInputRef = useRef<TextInput>(null)

  const stylesWithInsets = useMemo(() => styles({
    topInset: insets.top,
    windowDimensions,
  }), [insets.top, windowDimensions])

  const onCitiesToggle = () => {
    setIsCitiesListOpen((prev) => !prev)
  }

  const onSearchChange = (value: string) => {
    setSearch(value)
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
  
  return (
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

          <FilterIcon color='#F9F9F9' size={32} />
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
  )
}

export default HomeScreen
