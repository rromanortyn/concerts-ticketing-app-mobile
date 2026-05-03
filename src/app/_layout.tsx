import useAuthStore from '@/zustand/auth.store'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { EventProvider as OutsidePressProvider } from 'react-native-outside-press'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
console.log(user)
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
                {user ? <Drawer>
                  <Drawer.Screen name='attendee/index' />
                </Drawer> : <Stack>
                  {/*
                    add a separate route for IntroScreen
                    and remove it from the index screen
                    so the index screen can have its own header
                    use 'headerTitle' to place the city selector
                    use 'headerLeft' and 'headerRight' for icons
                    then it will be possible to toggle Drawer from the burger icon
                  */}
                  <Stack.Screen name='index' options={{ headerShown: false }} />
                  <Stack.Screen name='(auth)/sign-up' options={{ headerShown: false }} />
                  <Stack.Screen name='(auth)/login' options={{ headerShown: false }} />
                  <Stack.Screen name='storybook' options={{ headerShown: false }} />
                </Stack>}
                
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
