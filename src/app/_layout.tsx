import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { EventProvider as OutsidePressProvider } from 'react-native-outside-press'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useAuthStore from '@/zustand/auth.store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  const { user } = useAuthStore()

  return (
    <ThemeProvider value={{
      ...theme,
      colors: {
        ...theme.colors,
        background: '#F7F7F8',
      },
    }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <QueryClientProvider client={queryClient}>
              <OutsidePressProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name='index' />
                  <Stack.Screen name='intro' />
                  <Stack.Screen name='(auth)/sign-up' />
                  <Stack.Screen name='(auth)/login' />
                  <Stack.Screen name='attendee' />
                  <Stack.Screen name='events/[id]/index' />
                  <Stack.Screen name='events/[id]/tickets' />
                  <Stack.Screen name='storybook' />
                </Stack>
              </OutsidePressProvider>
            </QueryClientProvider>
          </KeyboardProvider>
          <StatusBar style='auto' />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

export default RootLayout
