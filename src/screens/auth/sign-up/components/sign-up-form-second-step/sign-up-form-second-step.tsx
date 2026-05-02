import { FC, useRef } from 'react'
import {
  Text,
  TextInput,
  View,
} from 'react-native'

import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  EyeIcon,
  LockIcon
} from 'lucide-react-native'
import z from 'zod'

import AppButton from '@/components/elements/app-button/app-button'
import AppTextField from '@/components/elements/app-text-field/app-text-field'

import styles from './styles'

const signUpSecondStepSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required'),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

interface SignUpFormState {
  password: string,
  confirmPassword: string,
}

const getErrorMessage = (message?: string) => {
  const jsx = message ? <Text style={styles.errorMessage}>{message}</Text> : null

  return jsx
}

interface SignUpFormSecondStepProps {
  onSubmit: (data: SignUpFormState) => void
}

const SignUpFormSecondStep: FC<SignUpFormSecondStepProps> = (props) => {
  const { onSubmit } = props

  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
  } = useForm<SignUpFormState>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSecondStepSchema),
  })

  return (
    <>
      <View style={styles.bottomContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.titleUp}></Text>
        </View>

        <Controller
          control={control}
          name='password'
          render={({
            field: { value, onChange },
            fieldState: { error },
          }) => (
            <View style={styles.formFieldContainer}>
              <Text style={styles.formFieldLabel}>Password</Text>
              <AppTextField
                ref={passwordInputRef}
                containerStyle={styles.formFieldInput}
                type='password'
                autoCapitalize='none'
                placeholder='Enter your password'
                value={value}
                leftAdornment={<LockIcon />}
                rightAdornment={
                  // This is for the default (hidden) state
                  // Otherwise should be the eye icon with a line through it
                  <EyeIcon />
                }
                onChangeText={onChange}
              />
              {getErrorMessage(error?.message)}
            </View>
          )}
        />
              
        <Controller
          control={control}
          name='confirmPassword'
          render={({
            field: { value, onChange },
            fieldState: { error },
            }) => (
            <View style={styles.formFieldContainer}>
              <Text style={styles.formFieldLabel}>Confirm password</Text>
              <AppTextField
                ref={confirmPasswordInputRef}
                containerStyle={styles.formFieldInput}
                type='password'
                autoCapitalize='none'
                placeholder='Confirm password'
                value={value}
                autoComplete='email'
                inputMode='email'
                leftAdornment={<LockIcon />}
                rightAdornment={
                  // This is for the default (hidden) state
                  // Otherwise should be the eye icon with a line through it
                  <EyeIcon />
                }
                onChangeText={onChange}
              />
              {getErrorMessage(error?.message)}
            </View>
          )}
        />
      </View>

      <AppButton
        title='Continue'
        onPress={handleSubmit(onSubmit)}
        type='primary'
        rightIcon={<ArrowRight color='#ECE8E8' />}
      />

      <AppButton
        title='Continue'
        onPress={handleSubmit(onSubmit)}
        type='primary'
        rightIcon={<ArrowRight color='#ECE8E8' />}
      />
    </>
  )
}

export default SignUpFormSecondStep
