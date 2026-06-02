import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import AppButton from '@/components/elements/app-button/app-button'
import AppTypography from '@/components/elements/app-typography/app-typography'

import { CheckIcon } from 'lucide-react-native'
import styles from './styles'

const dateFilters = [
  'Today',
  'Tomorrow',
  'This week',
  'Custom dates',
] as const

type DateFilter = typeof dateFilters[number]
type Venue = string
type CustomDateField = 'from' | 'to'

export interface EventsFiltersState {
  date: DateFilter | null,
  genres: number[],
  venues: number[],
  customDates: {
    from: Date | null,
    to: Date | null,
  },
}

const initialFiltersState: EventsFiltersState = {
  date: null,
  genres: [],
  venues: [],
  customDates: {
    from: null,
    to: null,
  },
}

const formatDate = (date: Date | null): string => {
  if (!date) {
    return 'Select date'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

interface EventsFilterBottomSheetProps {
  genres: { id: number, name: string }[],
  venues: { id: number, name: string }[],
  isVisible: boolean,
  onApply: (values: EventsFiltersState, isChanged: boolean) => void,
  onDismiss: () => void,
}

const EventsFilterBottomSheet: FC<EventsFilterBottomSheetProps> = (props) => {
  const {
    genres,
    venues,
    isVisible,
    onApply,
    onDismiss,
  } = props

  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const [filters, setFilters] = useState<EventsFiltersState>(initialFiltersState)
  const [activeDatePickerField, setActiveDatePickerField] = useState<CustomDateField | null>(null)

  const stylesWithInsets = useMemo(() => styles({
    bottomInset: insets.bottom,
    topInset: insets.top,
    windowDimensions,
  }), [
    insets.bottom,
    insets.top,
    windowDimensions,
  ])

  const filtersSheetSnapPoints = useMemo(() => ['100%'], [])

  const isFiltersChanged = useCallback((values: EventsFiltersState) => (
    Boolean(
      values.date
      || values.genres.length
      || values.venues.length
      || values.customDates.from
      || values.customDates.to,
    )
  ), [])

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0)
    }
  }, [isVisible])

  const onApplyFilters = useCallback(() => {
    const isChanged = isFiltersChanged(filters)

    onApply(filters, isChanged)
    onDismiss()
  }, [
    filters,
    isFiltersChanged,
    onApply,
    onDismiss,
  ])

  const onResetFilters = () => {
    setFilters(initialFiltersState)
    setActiveDatePickerField(null)
  }

  const onDateFilterPress = (date: DateFilter) => {
    setFilters((prev) => ({
      ...prev,
      date,
      customDates: date === 'Custom dates'
        ? prev.customDates
        : initialFiltersState.customDates,
    }))
  }

  const onCustomDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setActiveDatePickerField(null)
  
    if (event.type === 'dismissed' || !activeDatePickerField || !selectedDate) {
      return
    }
  
    setFilters((prev) => ({
      ...prev,
      date: 'Custom dates',
      customDates: {
        ...prev.customDates,
        [activeDatePickerField]: selectedDate,
      },
    }))
  }

  const onGenrePress = (id: number) => {
    setFilters((prev) => {
      const isSelected = prev.genres.includes(id)

      return {
        ...prev,
        genres: isSelected
          ? prev.genres.filter((item) => item !== id)
          : [...prev.genres, id],
      }
    })
  }

  const onVenuePress = (id: number) => {
    setFilters((prev) => {
      const isSelected = prev.venues.includes(id)

      return {
        ...prev,
        venues: isSelected
          ? prev.venues.filter((item) => item !== id)
          : [...prev.venues, id],
      }
    })
  }

  const renderFiltersSheetBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.45}
      pressBehavior='close'
    />
  ), [])

  const renderFiltersSheetFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props}>
        <View style={stylesWithInsets.filtersFooter}>
          <AppButton
            title='Reset'
            variant='outlined'
            onPress={onResetFilters}
          />
          <AppButton
            title='Apply'
            variant='filled'
            onPress={onApplyFilters}
          />
        </View>
      </BottomSheetFooter>
    ),
    [
      onApplyFilters,
      onResetFilters,
      stylesWithInsets.filtersFooter,
    ],
  )

  const customDatesJsx = (
    <View style={stylesWithInsets.customDatesContainer}>
      {(['from', 'to'] as const).map((field) => (
        <TouchableOpacity
          key={field}
          style={stylesWithInsets.customDateButton}
          activeOpacity={0.7}
          onPress={() => setActiveDatePickerField(field)}
        >
          <AppTypography
            variant='subtitle'
            style={stylesWithInsets.customDateLabel}
            text={field === 'from' ? 'From' : 'To'}
          />

          <AppTypography
            variant='subtitle'
            text={formatDate(filters.customDates[field])}
          />
        </TouchableOpacity>
      ))}

      {activeDatePickerField ? (
        <DateTimePicker
          mode='date'
          value={filters.customDates[activeDatePickerField] ?? new Date()}
          display='default'
          onChange={onCustomDateChange}
        />
      ) : null}
    </View>
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={filtersSheetSnapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
      backdropComponent={renderFiltersSheetBackdrop}
      footerComponent={renderFiltersSheetFooter}
      backgroundStyle={stylesWithInsets.filtersSheetBackground}
      handleIndicatorStyle={stylesWithInsets.filtersSheetHandleIndicator}
      topInset={insets.top}
      onClose={onDismiss}
    >
      <BottomSheetScrollView
        style={stylesWithInsets.filtersScrollView}
        contentContainerStyle={stylesWithInsets.filtersScrollContent}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps='handled'
      >
        <View style={stylesWithInsets.filtersSheetHeader}>
          <AppTypography variant='h2' text='Filters' />

          <AppTypography
            variant='subtitle'
            style={stylesWithInsets.filtersSheetSubtitle}
            text='Find events by date, genre, and venue.'
          />
        </View>

        <View style={stylesWithInsets.filterSection}>
          <AppTypography variant='h3' text='Dates' />

          <View style={stylesWithInsets.filterChipsContainer}>
            {dateFilters.map((date) => {
              const isSelected = filters.date === date

              return (
                <TouchableOpacity
                  key={date}
                  style={[
                    stylesWithInsets.filterChip,
                    isSelected && stylesWithInsets.filterChipSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => onDateFilterPress(date)}
                >
                  <AppTypography
                    variant='subtitle'
                    style={[
                      stylesWithInsets.filterChipText,
                      isSelected && stylesWithInsets.filterChipTextSelected,
                    ]}
                    text={date}
                  />
                </TouchableOpacity>
              )
            })}
          </View>

          {filters.date === 'Custom dates' ? customDatesJsx : null}
        </View>

        <View style={stylesWithInsets.filterSection}>
          <AppTypography variant='h3' text='Genres' />

          <View style={stylesWithInsets.filterChipsContainer}>
            {genres.map((genre) => {
              const isSelected = filters.genres.includes(genre.id)

              return (
                <TouchableOpacity
                  key={genre.id}
                  style={[
                    stylesWithInsets.filterChip,
                    isSelected && stylesWithInsets.filterChipSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => onGenrePress(genre.id)}
                >
                  <AppTypography
                    variant='subtitle'
                    style={[
                      stylesWithInsets.filterChipText,
                      isSelected && stylesWithInsets.filterChipTextSelected,
                    ]}
                    text={genre.name}
                  />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={stylesWithInsets.filterSection}>
          <AppTypography variant='h3' text='Venues' />

          <View style={stylesWithInsets.venuesList}>
            {venues.map((venue) => {
              const isSelected = filters.venues.includes(venue.id)

              return (
                <TouchableOpacity
                  key={venue.id}
                  style={stylesWithInsets.venueRow}
                  activeOpacity={0.7}
                  onPress={() => onVenuePress(venue.id)}
                >
                  <View
                    style={[
                      stylesWithInsets.checkbox,
                      isSelected && stylesWithInsets.checkboxSelected,
                    ]}
                  >
                    {isSelected ? (
                      <CheckIcon color='#F9F9F9' size={14} />
                    ) : null}
                  </View>

                  <AppTypography variant='subtitle' text={venue.name} />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

export default EventsFilterBottomSheet
