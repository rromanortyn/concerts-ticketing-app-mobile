import {
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'

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
    filled: '#3C896D',
    outlined: '#F7F7F8',
  },
  danger: {
    filled: '#8f1322',
    outlined: '#F7F7F8',
  },
}

const textColors: ButtonColors = {
  primary: {
    filled: '#ECE8E8',
    outlined: '#3C896D',
  },
  danger: {
    filled: '#ECE8E8',
    outlined: '#8F1322',
  },
}

const borderColors: ButtonColors = {
  primary: {
    filled: '#3C896D',
    outlined: '#3C896D',
  },
  danger: {
    filled: '#8F1322',
    outlined: '#8F1322',
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
