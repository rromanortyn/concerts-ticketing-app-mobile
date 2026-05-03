import { FC, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

import axiosInstance from '@/consts/axios-instance'
import AsyncStorageKey from '@/types/enums/async-storage-key.enum'
import Role from '@/types/enums/role.enum'
import SignUpFormFirstStep from './components/sign-up-form-first-step/sign-up-form-first-step'
import SignUpFormSecondStep from './components/sign-up-form-second-step/sign-up-form-second-step'

interface SignUpDetails {
  fullName: string,
  email: string,
  password: string,
}

const SignUpScreen: FC = () => {
  const [step, setStep] = useState<number>(0)

  const [details, setDetails] = useState<SignUpDetails>({
    fullName: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpDetails) => {
      const response = await axiosInstance.post('/auth/sign-up', data)

      return response.data
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem(AsyncStorageKey.AccessToken, data.accessToken)

      router.dismissAll()
      router.replace('/')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onFirstStepSubmit = (data: Omit<SignUpDetails, 'password'>) => {
    setDetails((prev) => ({ ...prev, ...data }))
    setStep(1)
  }

  const onSecondStepSubmit = async (data: Pick<SignUpDetails, 'password'>) => {
    const dto = {
      ...details,
      password: data.password,
      role: Role.Attendee,
    }

    await signUpMutation.mutateAsync(dto)
  }

  const onGoBackFromSecondStep = (password: string) => {
    setDetails((prev) => ({ ...prev, password }))
    setStep(0)
  }

  const steps = [
    <SignUpFormFirstStep
      defaultValues={details}
      onSubmit={onFirstStepSubmit} />,
    <SignUpFormSecondStep
      defaultValues={{
        password: details.password,
        confirmPassword: details.password,
      }}
      onGoBack={onGoBackFromSecondStep}
      onSubmit={onSecondStepSubmit}
    />,
  ]

  return (
    <>
      {steps[step]}
    </>
  )
}

export default SignUpScreen