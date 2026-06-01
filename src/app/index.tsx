import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/consts/axios-instance'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'
import useAuthStore from '@/zustand/auth.store'

const Index = () => {
  const router = useRouter()

  const { clearUser, setUser } = useAuthStore()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const checkAccessToken = async () => {
        try {
          const storedAccessToken = await AsyncStorage.getItem(AsyncStorageKey.AccessToken)

          if (!isActive) {
            return
          }

          if (!storedAccessToken) {
            setAccessToken(null)
            clearUser()

            router.replace('/intro')
  
            return
          }

          setAccessToken(storedAccessToken)
        }
        catch (error) {
          console.log(error)

          if (!isActive) {
            return
          }

          setAccessToken(null)
          clearUser()

          router.replace('/intro')
        }
      }

      checkAccessToken()

      return () => {
        isActive = false
      }
    }, [clearUser, router])
  )

  const getMeQuery = useQuery({
    queryKey: ['me', accessToken],
    queryFn: async () => {
      const response = await axiosInstance.get('/me')

      return response.data
    },
    enabled: Boolean(accessToken),
  })

  useEffect(() => {
    if (!getMeQuery.data) {
      return
    }

    setUser(getMeQuery.data)

    router.dismissAll()
    router.push('/attendee')
  }, [getMeQuery.data, router, setUser])

  useEffect(() => {
    if (!getMeQuery.isError) {
      return
    }

    const redirectToIntro = async () => {
      await AsyncStorage.removeItem(AsyncStorageKey.AccessToken)
      setAccessToken(null)
      clearUser()
      router.replace('/intro')
    }

    redirectToIntro()
  }, [clearUser, getMeQuery.isError, router])

  return <ActivityIndicator style={{ flex: 1 }} size={96} color='#3C896D' />
}

export default Index
