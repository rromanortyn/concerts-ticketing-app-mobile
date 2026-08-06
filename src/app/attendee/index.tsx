import { Button } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

import AttendeeHomeScreen from '@/screens/attendee/home/home.screen'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'
import useAuthStore from '@/zustand/auth.store'

const AttendeeIndex = () => {
  const router = useRouter()
  const { clearUser } = useAuthStore()

  return (
    <>
      <AttendeeHomeScreen />
      <Button title="sign out" onPress={async () => {
        clearUser()
        await AsyncStorage.removeItem(AsyncStorageKey.AccessToken)

        router.dismissAll()
        router.push('/')
      }} />
    </>
  )
}

export default AttendeeIndex
