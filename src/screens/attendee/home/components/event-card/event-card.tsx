import { FC } from 'react'
import { View } from 'react-native'

import { Image } from 'expo-image'
import { MapPinIcon } from 'lucide-react-native'

import AppTypography from '@/components/elements/app-typography/app-typography'
import EventCardProps from './event-card.props'

import styles from './styles'

const EventCard: FC<EventCardProps> = (props) => {
  const {
    containerWidth,
    title,
    venue,
    city,
    startDate,
  } = props

  const stylesWithDimensions = styles({ 
    containerWidth,
  })

  return (
    <View style={stylesWithDimensions.container}>
      <Image
        style={stylesWithDimensions.image}
        source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
        contentFit='cover'
        transition={500}
        onError={(error) => console.log(error)}
      />

      <View style={stylesWithDimensions.date}>
        <AppTypography
          variant='body'
          text={startDate.getDate().toString()}
          style={stylesWithDimensions.dateText}
        />
        <AppTypography
          variant='body'
          text={new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate)}
          style={stylesWithDimensions.dateText}
        />
      </View>

      <AppTypography
        variant='h3'
        text={title}
        style={stylesWithDimensions.title}
      />

      <View style={stylesWithDimensions.locationContainer}>
        <MapPinIcon color='#999' size={24} />
        <AppTypography
          variant='body'
          text={venue.name}
          style={stylesWithDimensions.venueNameText}
        />
      </View>
    </View>
  )
}

export default EventCard
