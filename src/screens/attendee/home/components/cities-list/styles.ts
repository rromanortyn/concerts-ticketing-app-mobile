import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  flatList: {
    maxHeight: Dimensions.get('window').height * 0.65,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    position: 'absolute',
    top: 120,
    left: 20,
  },
})

export default styles
