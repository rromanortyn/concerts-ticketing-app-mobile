import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <ThemeProvider value={{
      ...theme,
      colors: {
        ...theme.colors,
        background: '#F7F7F8',
      },
    }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name='index' options={{ headerShown: false }}/>
              <Stack.Screen name='(auth)/sign-up' options={{ headerShown: false }}/>
              <Stack.Screen name='storybook' options={{ headerShown: false }}/>
            </Stack>
          </QueryClientProvider>
        </KeyboardProvider>
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default RootLayout
