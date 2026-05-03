import { useFocusEffect } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'

import axiosInstance from '@/consts/axios-instance'
import HomeScreen from '@/screens/home/home.screen'
import IntroScreen from '@/screens/intro/intro.screen'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isGetMeQueryEnabled, setIsGetMeQueryEnabled] = useState<boolean>(false)

  useFocusEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = await AsyncStorage.getItem(AsyncStorageKey.AccessToken)

      if (accessToken) {
        setIsGetMeQueryEnabled(true)
      }

      else {
        setIsLoading(false)
      }
    }

    checkAccessToken()
  })

  const getMeQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await axiosInstance.get('/me')

      return response.data
    },
    enabled: isGetMeQueryEnabled,
  })

  useEffect(() => {
    if (getMeQuery.isSuccess || getMeQuery.isError) {
      setIsLoading(false)
    }
  }, [getMeQuery.isSuccess, getMeQuery.isError])

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size={96} color='#3C896D' />
  }

  return (
    <>
      {getMeQuery.data ? <HomeScreen /> : (
        <SafeAreaView style={{ height: '100%', paddingHorizontal: 20 }}>
          <IntroScreen />
        </SafeAreaView>
      )}
    </>
  )
}

export default Index
