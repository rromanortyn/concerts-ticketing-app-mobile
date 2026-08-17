import { FC } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'

import authService, { LoginRequestDto } from '@/services/auth/auth.service'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'
import LoginForm from './components/login-form/login-form'

const LoginScreen: FC = () => {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequestDto) => {
      return authService.login(data)
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

  const getPasswordErrorMessage = () => {
    if (loginMutation.error === null) {
      return undefined
    }

    const { response } = loginMutation.error as AxiosError
    
    return (response?.data as { message: string })?.message
  }

  return (
    <>
      <LoginForm
        onSubmit={onSubmit}
        serverSideErrors={{
          password: getPasswordErrorMessage(),
        }}
      />
    </>
  )
}

export default LoginScreen