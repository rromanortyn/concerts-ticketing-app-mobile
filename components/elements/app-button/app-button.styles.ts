import { StyleSheet } from 'react-native'

import colors from '@/theme/colors/button'
import { ButtonType } from './app-button.props'

type Options = {
  type: ButtonType
  isDisabled: boolean
}

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

const borderRadius = 32
const borderWidth = 1.35

const touchableOpacityStyles: Record<ButtonType, object> = {
  primary: {
    borderRadius,
    borderWidth,
    borderColor: borderColors.primary,
    backgroundColor: backgroundColors.primary,
  },
  secondary: {
    borderRadius,
    borderWidth,
    borderColor: borderColors.secondary,
    backgroundColor: backgroundColors.secondary,
  },
  text: {},
  danger: {
    borderRadius,
    borderWidth,
    borderColor: borderColors.danger,
    backgroundColor: backgroundColors.danger,
  },
}

const styles = ({ type, isDisabled }: Options) => StyleSheet.create({
  touchableOpacity: {
    ...touchableOpacityStyles[type],
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: isDisabled ? 0.5 : 1,
  },
  text: {
    color: textColors[type],
    fontSize: 16,
  },
})

export default styles