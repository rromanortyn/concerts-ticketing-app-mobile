interface EventsSectionProps {
  title: string,
  isEventsFetching: boolean,
  events: {
    id: number,
    title: string,
    venue: { name: string },
    city: { name: string },
    startDate: Date,
    image: { src: string },
  }[],
}

export default EventsSectionProps
