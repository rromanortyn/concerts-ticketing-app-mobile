import { FC } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

import axiosInstance from '@/consts/axios-instance'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'
import LoginForm from './components/login-form/login-form'

interface LoginRequestDto {
  email: string,
  password: string,
}

const LoginScreen: FC = () => {
  const router = useRouter()
  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequestDto) => {
      const response = await axiosInstance.post('/auth/login', data)
      return response.data
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem(AsyncStorageKey.AccessToken, data.accessToken)

      router.push('/')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = async (dto: LoginRequestDto) => {
    await loginMutation.mutateAsync(dto)
  }

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  )
}

export default LoginScreen