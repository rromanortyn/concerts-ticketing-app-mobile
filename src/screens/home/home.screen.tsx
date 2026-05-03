import { FC } from 'react'
import {
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import {
  BellIcon,
  ChevronDownIcon,
  FilterIcon,
  MenuIcon,
  SearchIcon,
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppTypography from '@/components/elements/app-typography/app-typography'
import styles from './styles'

const HomeScreen: FC = () => {
  const insets = useSafeAreaInsets()

  const stylesWithInsets = styles(insets.top)

  return (
    <View style={stylesWithInsets.container}>
      <View style={stylesWithInsets.topContainer}>
        <MenuIcon color='#F9F9F9' size={32} />

        <TouchableOpacity style={stylesWithInsets.locationPressableContainer} activeOpacity={0.7}>
          <View style={stylesWithInsets.locationTopContainer}>
            <AppTypography
              variant='subtitle'
              style={stylesWithInsets.locationSubtitle}
              text='Selected location'
            />
            <ChevronDownIcon color='#F9F9F9' size={16} />
          </View>

          <AppTypography
            variant='h3'
            style={stylesWithInsets.locationH3}
            text='Kyiv'
          />
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
  )
}

export default HomeScreen
