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
type CustomDateField = 'from' | 'to'

export interface EventsFiltersState {
  genres: number[],
  venues: number[],
  customDates: {
    from: Date | null,
    to: Date | null,
  },
}

const initialFiltersState: EventsFiltersState = {
  genres: [],
  venues: [],
  customDates: {
    from: null,
    to: null,
  },
}

export const createInitialEventsFiltersState = (
  values: EventsFiltersState = initialFiltersState,
): EventsFiltersState => ({
  genres: [...values.genres],
  venues: [...values.venues],
  customDates: {
    from: values.customDates.from ? new Date(values.customDates.from) : null,
    to: values.customDates.to ? new Date(values.customDates.to) : null,
  },
})

const createCurrentHourDate = (date = new Date()): Date => {
  const currentHourDate = new Date(date)

  currentHourDate.setMinutes(0, 0, 0)

  return currentHourDate
}

const createMidnightDate = (date: Date, daysToAdd: number): Date => {
  const midnightDate = new Date(date)

  midnightDate.setHours(0, 0, 0, 0)
  midnightDate.setDate(midnightDate.getDate() + daysToAdd)

  return midnightDate
}

const getDateFilterCustomDates = (dateFilter: Exclude<DateFilter, 'Custom dates'>) => {
  const now = new Date()
  const currentHourDate = createCurrentHourDate(now)

  if (dateFilter === 'Today') {
    return {
      from: currentHourDate,
      to: createMidnightDate(now, 1),
    }
  }

  if (dateFilter === 'Tomorrow') {
    const tomorrowCurrentHourDate = new Date(currentHourDate)

    tomorrowCurrentHourDate.setDate(tomorrowCurrentHourDate.getDate() + 1)

    return {
      from: tomorrowCurrentHourDate,
      to: createMidnightDate(now, 2),
    }
  }

  const daysUntilMonday = now.getDay() === 0 ? 1 : 8 - now.getDay()

  return {
    from: currentHourDate,
    to: createMidnightDate(now, daysUntilMonday),
  }
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
  initialValues?: EventsFiltersState,
  onApply: (values: EventsFiltersState, isChanged: boolean) => void,
  onDismiss: () => void,
}

const EventsFilterBottomSheet: FC<EventsFilterBottomSheetProps> = (props) => {
  const {
    genres,
    venues,
    isVisible,
    initialValues = initialFiltersState,
    onApply,
    onDismiss,
  } = props

  const windowDimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const [filters, setFilters] = useState<EventsFiltersState>(
    () => createInitialEventsFiltersState(initialValues),
  )
  const [activeDatePickerField, setActiveDatePickerField] = useState<CustomDateField | null>(null)
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter | null>(null)

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
      values.genres.length
      || values.venues.length
      || values.customDates.from
      || values.customDates.to,
    )
  ), [])

  useEffect(() => {
    if (isVisible) {
      setFilters(createInitialEventsFiltersState(initialValues))
      setActiveDatePickerField(null)
      setSelectedDateFilter(null)
      bottomSheetRef.current?.snapToIndex(0)
    }
  }, [
    initialValues,
    isVisible,
  ])

  const onApplyFilters = useCallback(() => {
    const isChanged = isFiltersChanged(filters)

    onApply(createInitialEventsFiltersState(filters), isChanged)
    onDismiss()
  }, [
    filters,
    isFiltersChanged,
    onApply,
    onDismiss,
  ])

  const onResetFilters = () => {
    setFilters(createInitialEventsFiltersState())
    setActiveDatePickerField(null)
    setSelectedDateFilter(null)
  }

  const onDateFilterPress = (dateFilter: DateFilter) => {
    const isSelected = selectedDateFilter === dateFilter

    setSelectedDateFilter(isSelected ? null : dateFilter)

    setFilters((prev) => {
      if (isSelected) {
        return {
          ...prev,
          customDates: initialFiltersState.customDates,
        }
      }

      if (dateFilter === 'Custom dates') {
        return {
          ...prev,
          customDates: prev.customDates,
        }
      }

      return {
        ...prev,
        customDates: getDateFilterCustomDates(dateFilter),
      }
    })
  }

  const onCustomDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setActiveDatePickerField(null)
  
    if (event.type === 'dismissed' || !activeDatePickerField || !selectedDate) {
      return
    }
  
    setSelectedDateFilter('Custom dates')

    setFilters((prev) => ({
      ...prev,
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
              const isSelected = selectedDateFilter === date

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

          {selectedDateFilter === 'Custom dates' ? customDatesJsx : null}
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
