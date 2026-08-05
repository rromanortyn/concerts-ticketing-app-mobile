import { FC } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

import { Image } from 'expo-image'
import { router } from 'expo-router'
import { ChevronRightIcon } from 'lucide-react-native'

import AppTypography from '@/components/elements/app-typography/app-typography'
import EventCard from '../event-card/event-card'
import EventsSectionProps from './events-section.props'

import styles from './styles'

const EventsSection: FC<EventsSectionProps> = (props) => {
  const {
    title,
    isEventsFetching,
    events,
  } = props

  const onEventPress = (id: number) => {
    router.push(`/events/${id}`)
  }

  const contentJsx = isEventsFetching ? (
    <View style={styles.sectionLoaderContainer}>
      <ActivityIndicator size={96} color='#3C896D' />
    </View>
  ) : events.map((event) => (
    <TouchableOpacity
      key={event.id}
      activeOpacity={0.7}
      onPress={() => onEventPress(event.id)}
    >
      <EventCard
        containerWidth={Dimensions.get('window').width * 0.7}
        title={event.title}
        venue={event.venue}
        city={event.city}
        startDate={new Date(event.startDate)}
        image={event.image}
      />
    </TouchableOpacity>
  ))

  return (
    <>
      <View style={styles.sectionHeaderContainer}>
        <AppTypography variant='h3' text={title} />

        <TouchableOpacity style={styles.seeAllButton}>
          <AppTypography variant='subtitle' text='See all' />
          <ChevronRightIcon color='#000' size={16} />
        </TouchableOpacity>
      </View>

      {events.length === 0 && !isEventsFetching && (
        <View style={styles.emptyEventsContainer}>
          <Image
            source={require('./no-events-found.png')}
            style={styles.emptyEventsImage}
          />
          <AppTypography
            variant='h3'
            text='No events planned'
            style={styles.emptyEventsTitle}
          />
          <AppTypography
            variant='subtitle'
            text='There are no concerts or events scheduled right now.'
            style={styles.emptyEventsDescription}
          />
          <AppTypography
            variant='subtitle'
            text='Check back later for upcoming events and unforgettable experiences.'
            style={styles.emptyEventsHint}
          />
        </View>
      )}
      <ScrollView
        horizontal
        contentContainerStyle={styles.eventsListContainer}
      >
        {contentJsx}
      </ScrollView>
    </>
  )
}

export default EventsSection
