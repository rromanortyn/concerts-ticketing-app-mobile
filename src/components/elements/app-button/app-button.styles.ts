import {
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'

import colors from '@/theme/colors/button'
import { ButtonIntent, ButtonVariant } from './app-button.props'

type Options = {
  intent: ButtonIntent
  variant: ButtonVariant
  isDisabled: boolean
}

type ButtonColors = Record<
    ButtonIntent,
    Record<ButtonVariant, string>
  >

const backgroundColors: ButtonColors = {
  primary: {
    filled: colors.light.primary.background,
    outlined: colors.light.secondary.background,
  },
  danger: {
    filled: colors.light.danger.background,
    outlined: colors.light.secondary.background,
  },
}

const textColors: ButtonColors = {
  primary: {
    filled: colors.light.primary.text,
    outlined: colors.light.primary.text,
  },
  danger: {
    filled: colors.light.danger.text,
    outlined: colors.light.danger.text,
  },
}

const borderColors: ButtonColors = {
  primary: {
    filled: colors.light.primary.border,
    outlined: colors.light.primary.border,
  },
  danger: {
    filled: colors.light.danger.border,
    outlined: colors.light.danger.border,
  },
}

const borderRadius = 32
const borderWidth = 1.35

const touchableOpacityStyles: Record<
    ButtonIntent,
    Record<ButtonVariant, StyleProp<ViewStyle>>
  > = {
  primary: {
    filled: {
      borderRadius,
      borderWidth,
      borderColor: borderColors.primary.filled,
      backgroundColor: backgroundColors.primary.filled,
    },
    outlined: {
      borderRadius,
      borderWidth,
      borderColor: borderColors.primary.outlined,
      backgroundColor: backgroundColors.primary.outlined,
    },
  },
  danger: {
    filled: {
      borderRadius,
      borderWidth,
      borderColor: borderColors.danger.filled,
      backgroundColor: backgroundColors.danger.filled,
    },
    outlined: {
      borderRadius,
      borderWidth,
      borderColor: borderColors.danger.outlined,
      backgroundColor: backgroundColors.danger.outlined,
    },
  },
}

const styles = ({ intent, variant, isDisabled }: Options) => StyleSheet.create({
  touchableOpacity: {
    ...touchableOpacityStyles[intent][variant],
    position: 'relative',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: isDisabled ? 0.5 : 1,
  },
  text: {
    color: textColors[intent][variant],
    fontSize: 16,
    flexGrow: 1,
    textAlign: 'center',
  },
  leftIconContainer: {
    position: 'absolute',
    left: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    position: 'absolute',
    right: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
