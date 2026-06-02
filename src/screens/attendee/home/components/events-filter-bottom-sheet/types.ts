import { dateFilters } from './consts'

export interface EventsFiltersState {
  genres: number[],
  venues: number[],
  customDates: {
    from: Date | null,
    to: Date | null,
  },
}

export interface EventsFilterDates {
  from: Date,
  to: Date,
}

export type DateFilter = typeof dateFilters[number]
export type CustomDateField = 'from' | 'to'
