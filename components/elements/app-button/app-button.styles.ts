import { StyleSheet } from 'react-native'

import { ButtonType } from './app-button.props'

const backgroundColors: Record<ButtonType, string> = {
  primary: '#0a7ea4',
  secondary: '#6c757d',
  danger: '#dc3545',
  text: 'transparent',
}

const textColors: Record<ButtonType, string> = {
  primary: '#ece8e8',
  secondary: '#ece8e8',
  danger: '#ece8e8',
  text: '#0a7ea4',
}

const borderColors: Record<ButtonType, string> = {
  primary: 'transparent',
  secondary: 'transparent',
  danger: 'transparent',
  text: 'transparent',
}

const touchableOpacityStyles: Record<ButtonType, object> = {
  primary: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderColors.primary,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColors.primary,
  },
  secondary: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderColors.secondary,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColors.secondary,
  },
  text: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  danger: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderColors.danger,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColors.danger,
  },
}

const styles = (type: ButtonType) => StyleSheet.create({
  touchableOpacity: touchableOpacityStyles[type],
  text: {
    color: textColors[type],
    fontSize: 16,
  },
})

export default styles