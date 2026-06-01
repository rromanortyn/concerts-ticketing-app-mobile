import { FC } from 'react'
import { View } from 'react-native'

import { Image } from 'expo-image'
import { MapPinIcon } from 'lucide-react-native'

import AppTypography from '@/components/elements/app-typography/app-typography'

import styles from './styles'

interface EventCardProps {
  containerWidth: number,
  imageWidth: number,
  imageHeight: number,
}

const EventCard: FC<EventCardProps> = (props) => {
  const {
    containerWidth,
    imageWidth,
    imageHeight,
  } = props

  const stylesWithDimensions = styles({ 
    containerWidth, 
    imageWidth, 
    imageHeight 
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
          text='12'
          style={stylesWithDimensions.dateText}
        />
        <AppTypography
          variant='body'
          text='June'
          style={stylesWithDimensions.dateText}
        />
      </View>

      <AppTypography
        variant='h3'
        text='Event name blablablablablablablabla'
        style={stylesWithDimensions.title}
      />

      <View style={stylesWithDimensions.locationContainer}>
        <MapPinIcon color='#999' size={24} />
        <AppTypography
          variant='body'
          text='Kyiv, Ukraine'
          style={stylesWithDimensions.locationText}
        />
      </View>
    </View>
  )
}

export default EventCard
