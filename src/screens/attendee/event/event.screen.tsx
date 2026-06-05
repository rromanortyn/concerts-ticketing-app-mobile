import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import {
  CalendarDaysIcon,
  MapPinIcon,
  TicketIcon,
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppTypography from '@/components/elements/app-typography/app-typography'
import axiosInstance from '@/consts/axios-instance'

import styles from './styles'

interface EventDetails {
  id: number,
  title: string,
  description?: string | null,
  image: {
    src: string,
  },
  venue: {
    name: string,
    address?: string | null,
  },
  city: {
    name: string,
  },
  startDate: Date | string,
  endDate?: Date | string | null,
  isSaved?: boolean,
  minPrice?: number | null,
  price?: number | null,
}

const dummyOrganizer = {
  name: 'Live Nation Concerts',
  role: 'Event organizer',
  imageSrc: 'https://picsum.photos/seed/event-organizer/200/200',
}

const formatDate = (value?: Date | string | null): string => {
  if (!value) {
    return 'Date to be announced'
  }

  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

const formatTime = (value?: Date | string | null): string => {
  if (!value) {
    return 'Time to be announced'
  }

  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

const EventScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const insets = useSafeAreaInsets()
  const windowDimensions = useWindowDimensions()
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const stylesWithDimensions = useMemo(() => styles({
    bottomInset: insets.bottom,
    imageHeight: windowDimensions.height * 0.46,
    topInset: insets.top,
  }), [
    insets.bottom,
    insets.top,
    windowDimensions.height,
  ])

  const {
    data: event,
    isFetching,
    isError,
  } = useQuery<EventDetails>({
    queryKey: ['get-event', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/events/${id}`)

      return response.data
    },
    enabled: !!id,
  })

  useEffect(() => {
    if (typeof event?.isSaved === 'boolean') {
      setIsSaved(event.isSaved)
    }
  }, [event?.isSaved])

  const onSavePress = () => {
    setIsSaved((prev) => !prev)
  }

  const price = event?.minPrice ?? event?.price
  const priceLabel = typeof price === 'number' ? `$${price}` : 'Get tickets'
  const location = [event?.venue.name, event?.city.name].filter(Boolean).join(', ')

  const contentJsx = (() => {
    if (isFetching) {
      return (
        <View style={stylesWithDimensions.loaderContainer}>
          <ActivityIndicator size={96} color='#3C896D' />
        </View>
      )
    }

    if (isError || !event) {
      return (
        <View style={stylesWithDimensions.loaderContainer}>
          <AppTypography
            variant='h3'
            text='Unable to load this event'
            style={stylesWithDimensions.errorTitle}
          />
          <AppTypography
            variant='body'
            text='Please go back and try again.'
            style={stylesWithDimensions.mutedText}
          />
        </View>
      )
    }

    return (
      <>
        <Image
          style={stylesWithDimensions.heroImage}
          source={{ uri: event.image.src }}
          contentFit='cover'
          transition={500}
        />

        <View style={stylesWithDimensions.detailsContainer}>
          <AppTypography
            variant='h1'
            text={event.title}
            style={stylesWithDimensions.title}
          />

          <View style={stylesWithDimensions.infoCard}>
            <View style={stylesWithDimensions.infoIconContainer}>
              <CalendarDaysIcon color='#3C896D' size={28} />
            </View>

            <View style={stylesWithDimensions.infoTextContainer}>
              <AppTypography
                variant='h3'
                text={formatDate(event.startDate)}
                style={stylesWithDimensions.infoTitle}
              />
              <AppTypography
                variant='body'
                text={`${formatTime(event.startDate)}${event.endDate ? ` - ${formatTime(event.endDate)}` : ''}`}
                style={stylesWithDimensions.mutedText}
              />
            </View>
          </View>

          <View style={stylesWithDimensions.infoCard}>
            <View style={stylesWithDimensions.infoIconContainer}>
              <MapPinIcon color='#3C896D' size={28} />
            </View>

            <View style={stylesWithDimensions.infoTextContainer}>
              <AppTypography
                variant='h3'
                text={event.venue.name}
                style={stylesWithDimensions.infoTitle}
              />
              <AppTypography
                variant='body'
                text={event.venue.address || location}
                style={stylesWithDimensions.mutedText}
              />
            </View>
          </View>

          <View style={stylesWithDimensions.organizerCard}>
            <Image
              style={stylesWithDimensions.organizerImage}
              source={{ uri: dummyOrganizer.imageSrc }}
              contentFit='cover'
            />

            <View style={stylesWithDimensions.infoTextContainer}>
              <AppTypography
                variant='h3'
                text={dummyOrganizer.name}
                style={stylesWithDimensions.infoTitle}
              />
              <AppTypography
                variant='body'
                text={dummyOrganizer.role}
                style={stylesWithDimensions.mutedText}
              />
            </View>
          </View>

          <View style={stylesWithDimensions.sectionContainer}>
            <AppTypography
              variant='h2'
              text='About event'
              style={stylesWithDimensions.sectionTitle}
            />
            <AppTypography
              variant='body'
              text={event.description || 'Enjoy an unforgettable live music experience with great performances, a vibrant crowd, and everything you need for a memorable night out.'}
              style={stylesWithDimensions.descriptionText}
              numberOfLines={0}
            />
          </View>
        </View>
      </>
    )
  })()

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerStyle: stylesWithDimensions.header,
          headerLeft: () => (
            <TouchableOpacity
              style={stylesWithDimensions.headerButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Ionicons name='chevron-back' color='#111' size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={stylesWithDimensions.headerButton}
              activeOpacity={0.7}
              onPress={onSavePress}
            >
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                color='#111'
                size={24}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={stylesWithDimensions.container}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={stylesWithDimensions.scrollContentContainer}
        >
          {contentJsx}
        </ScrollView>

        {event ? (
          <View style={stylesWithDimensions.footerContainer}>
            <View>
              <AppTypography
                variant='subtitle'
                text='Start from'
                style={stylesWithDimensions.mutedText}
              />
              <AppTypography
                variant='h2'
                text={priceLabel}
                style={stylesWithDimensions.priceText}
              />
            </View>

            <TouchableOpacity
              style={stylesWithDimensions.ticketButton}
              activeOpacity={0.7}
            >
              <TicketIcon color='#F9F9F9' size={22} />
              <AppTypography
                variant='h3'
                text='Buy Ticket'
                style={stylesWithDimensions.ticketButtonText}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  )
}

export default EventScreen
