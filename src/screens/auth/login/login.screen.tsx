import { FC } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

import axiosInstance from '@/consts/axios-instance'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'
import useAuthStore from '@/zustand/auth.store'
import LoginForm from './components/login-form/login-form'

interface LoginRequestDto {
  email: string,
  password: string,
}

const LoginScreen: FC = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequestDto) => {
      const response = await axiosInstance.post('/auth/login', data)
      console.log(response)
      return response.data
    },
    onSuccess: async (data) => {console.log(data)
      await AsyncStorage.setItem(AsyncStorageKey.AccessToken, data.accessToken)

      const getMeResponse = await axiosInstance.get('/me')
      setUser(getMeResponse.data)

      router.dismissAll()
      router.replace('/')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = async (dto: LoginRequestDto) => {
    await loginMutation.mutateAsync(dto)
    console.log('submit finished')
  }

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  )
}

export default LoginScreen