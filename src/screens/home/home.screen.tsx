import {
  FC,
  useMemo,
  useState,
} from 'react'
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'

import { Image } from 'expo-image'
import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FilterIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppTypography from '@/components/elements/app-typography/app-typography'
import CitySuggestion from './components/city-suggestion/city-suggestion'

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

const HomeScreen: FC = () => {
  const [isCitiesListOpen, setIsCitiesListOpen] = useState<boolean>(false)

  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const stylesWithInsets = useMemo(() => styles({
    topInset: insets.top,
    windowDimensions,
  }), [insets.top, windowDimensions])

  const onCitiesToggle = () => {
    setIsCitiesListOpen((prev) => !prev)
  }
  
  const citySelectorChevronJsx = isCitiesListOpen ? (
    <ChevronUpIcon color='#F9F9F9' size={16} />
  ) : (
    <ChevronDownIcon color='#F9F9F9' size={16} />
  )

  const citiesListJsx = isCitiesListOpen ? (
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
  ) : null
  
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={stylesWithInsets.container}>
        <View style={stylesWithInsets.topContainer}>
          <MenuIcon color='#F9F9F9' size={32} />

          <TouchableOpacity
            style={stylesWithInsets.citySelectorPressableContainer}
            activeOpacity={0.7}
            onPress={onCitiesToggle}
          >
            <AppTypography
              variant='h3'
              style={stylesWithInsets.citySelectorH3}
              text='Kyiv'
            />

            <View style={stylesWithInsets.citySelectorTopContainer}>
              <AppTypography
                variant='subtitle'
                style={stylesWithInsets.citySelectorSubtitle}
                text='Select another city'
              />
              {citySelectorChevronJsx}
            </View>
          </TouchableOpacity>
          
          <BellIcon color='#F9F9F9' size={32} />
        </View>

        <View style={stylesWithInsets.bottomContainer}>
          <View style={stylesWithInsets.searchContainer}>
            <SearchIcon color='#F9F9F9' size={32} />
            <TextInput placeholder='Search...' style={stylesWithInsets.searchInput} />
          </View>

          <FilterIcon color='#F9F9F9' size={32} />
        </View>
      </View>

      {citiesListJsx}

      {/* This empty view is required for correct layout */}
      <View>
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <AppTypography variant='h3' text='Upcoming events' />

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <AppTypography variant='subtitle' text='See all' />
            <ChevronRightIcon color='#000' size={16} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal contentContainerStyle={{ gap: 16, paddingHorizontal: 20 }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={{
              borderRadius: 12,
              position: 'relative',
              width: windowDimensions.width * 0.7,
              padding: 20,
              backgroundColor: '#FFF',
            }}>
              <Image
                style={{
                  width: windowDimensions.width * 0.7 - 40,
                  height: windowDimensions.width * 0.7 - 40,
                  borderRadius: 16,
                  marginBottom: 20,
                }}
                source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
                contentFit='cover'
                transition={500}
                onError={(error) => console.log(error)}
              />

              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                backgroundColor: '#f9f9f9',
                width: 70,
                height: 70,
                position: 'absolute',
                top: 30,
                left: 30,
              }}>
              <AppTypography variant='body' text='12' style={{ color: '#3C896D' }} />
              <AppTypography variant='body' text='June' style={{ color: '#3C896D' }} />
            </View>

            <AppTypography variant='h3' text='Event name blablablablablablablabla' style={{ color: '#000', marginBottom: 20 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MapPinIcon color='#999' size={24} />
              <AppTypography variant='body' text='Kyiv, Ukraine' style={{ color: '#999' }} />
            </View>
          </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen
