import { EventsFiltersState } from './types'

export const dateFilters = [
  'Today',
  'Tomorrow',
  'This week',
  'Custom dates',
] as const

export const initialFiltersState: EventsFiltersState = {
  genres: [],
  venues: [],
  customDates: {
    from: null,
    to: null,
  },
}
