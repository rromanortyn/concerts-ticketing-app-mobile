import { FC } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

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

  const contentJsx = isEventsFetching ? (
    <View style={styles.sectionLoaderContainer}>
      <ActivityIndicator size={96} color='#3C896D' />
    </View>
  ) : events.map((event) => (
    <TouchableOpacity key={event.id} activeOpacity={0.7}>
      <EventCard
        containerWidth={Dimensions.get('window').width * 0.7}
        title={event.title}
        venue={event.venue}
        city={event.city}
        startDate={new Date(event.startDate)}
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
