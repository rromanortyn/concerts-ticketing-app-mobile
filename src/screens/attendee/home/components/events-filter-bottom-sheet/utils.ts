import { initialFiltersState } from './consts'
import {
  DateFilter,
  EventsFilterDates,
  EventsFiltersState,
} from './types'

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

export const getDateFilterCustomDates = (dateFilter: Exclude<DateFilter, 'Custom dates'>): EventsFilterDates => {
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

export const formatDate = (date: Date | null): string => {
  if (!date) {
    return 'Select date'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
