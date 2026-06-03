import { EventsFiltersState } from './types'

interface EventsFilterBottomSheetProps {
  genres: { id: number, name: string }[],
  venues: { id: number, name: string }[],
  isVisible: boolean,
  isLoading: boolean,
  initialValues?: EventsFiltersState,
  onApply: (values: EventsFiltersState, isChanged: boolean) => void,
  onDismiss: () => void,
}
export default EventsFilterBottomSheetProps
