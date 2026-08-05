import { StyleSheet } from 'react-native'

const styles = (isFocused: boolean) => StyleSheet.create({
  container: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1.35,
    borderColor: isFocused ? '#3C896D' : 'transparent',
    backgroundColor: '#ECECEC',
  },
  textInput: {
    padding: 20,
    flexGrow: 1,
    color: '#11181C',
  },
  leftAdornmentContainer: {
    marginLeft: 20,
  },
  rightAdornmentContainer: {
    marginRight: 20,
  },
})

export default styles
