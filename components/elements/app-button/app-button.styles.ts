import { StyleSheet } from 'react-native'

import colors from '@/theme/colors/button'
import { ButtonType } from './app-button.props'

const backgroundColors: Record<ButtonType, string> = {
  primary: colors.light.primary.background,
  secondary: colors.light.secondary.background,
  text: colors.light.text.background,
  danger: colors.light.danger.background,
}

const textColors: Record<ButtonType, string> = {
  primary: colors.light.primary.text,
  secondary: colors.light.secondary.text,
  text: colors.light.text.text,
  danger: colors.light.danger.text,
}

const borderColors: Record<ButtonType, string> = {
  primary: colors.light.primary.border,
  secondary: colors.light.secondary.border,
  danger: colors.light.danger.border,
  text: colors.light.text.border,
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