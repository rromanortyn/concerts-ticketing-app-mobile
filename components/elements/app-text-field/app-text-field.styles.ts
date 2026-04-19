import { StyleSheet } from 'react-native'



const styles = (isFocused: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1.35,
    borderColor: isFocused ? '#3C896D' : 'transparent',
    backgroundColor: '#ECECEC',
  },
  textInput: {
    padding: 20,
    width: '100%',
    color: '#11181C',
  },

})

export default styles
