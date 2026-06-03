import { StyleSheet } from 'react-native'

interface Props {
  containerWidth: number,
}

const styles = ({ containerWidth }: Props) => StyleSheet.create({
   container: {
    borderRadius: 12,
    position: 'relative',
    width: containerWidth,
    padding: 20,
    backgroundColor: '#FFF',
  },
  image: {
    width: containerWidth - 40,
    height: containerWidth - 40,
    borderRadius: 16,
    marginBottom: 20,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: 70,
    height: 70,
    position: 'absolute',
    top: 30,
    left: 30,
  },
  dateText: {
    color: '#3C896D',
  },
  title: {
    color: '#000',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  venueNameText: {
    color: '#999',
    marginBottom: 4,
  },
})

export default styles
