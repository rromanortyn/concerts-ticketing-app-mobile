import { StyleSheet } from 'react-native'

interface Props {
  containerWidth: number,
  imageWidth: number,
  imageHeight: number,
}

const styles = ({ containerWidth, imageWidth, imageHeight }: Props) => StyleSheet.create({
  container: {
    borderRadius: 12,
    position: 'relative',
    width: containerWidth,
    padding: 20,
    backgroundColor: '#FFF',
  },
  image: {
    width: imageWidth,
    height: imageHeight,
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
  locationText: {
    color: '#999',
  },
})

export default styles
