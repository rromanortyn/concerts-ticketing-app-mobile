declare module '@expo/ui/jetpack-compose' {
  import { ComponentType, ReactNode } from 'react'
  import { ColorValue, StyleProp, ViewStyle } from 'react-native'

  export interface ExpoUiViewProps {
    children?: ReactNode,
    matchContents?: boolean,
    modifiers?: unknown[],
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
    style?: StyleProp<ViewStyle>,
  }

  export interface ModalBottomSheetProperties {
    shouldDismissOnBackPress?: boolean,
    shouldDismissOnClickOutside?: boolean,
  }

  export interface ModalBottomSheetProps extends ExpoUiViewProps {
    containerColor?: ColorValue,
    contentColor?: ColorValue,
    onDismissRequest: () => void,
    properties?: ModalBottomSheetProperties,
    scrimColor?: ColorValue,
    sheetGesturesEnabled?: boolean,
    showDragHandle?: boolean,
    skipPartiallyExpanded?: boolean,
  }

  export interface ModalBottomSheetRef {
    hide: () => Promise<void>,
  }

  export interface RNHostViewProps extends ExpoUiViewProps {}

  export const Host: ComponentType<ExpoUiViewProps>
  export const ModalBottomSheet: ComponentType<ModalBottomSheetProps>
  export const RNHostView: ComponentType<RNHostViewProps>
}
