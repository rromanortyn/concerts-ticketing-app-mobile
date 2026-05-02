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
  AtSign,
  UserRound,
} from 'lucide-react-native'
import z from 'zod'

import AppButton from '@/components/elements/app-button/app-button'
import AppTextField from '@/components/elements/app-text-field/app-text-field'

import getErrorMessageJsx from '@/utils/get-error-message-jsx'
import styles from './styles'

const signUpFirstStepSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required'),
  email: z
    .email('Invalid email'),
})

interface SignUpFirstStepState {
  fullName: string,
  email: string,
}

interface SignUpFormFirstStepProps {
  onSubmit: (data: SignUpFirstStepState) => void,
  defaultValues?: SignUpFirstStepState,
}

const SignUpFormFirstStep: FC<SignUpFormFirstStepProps> = (props) => {
  const { onSubmit, defaultValues } = props

  const fullNameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
  } = useForm<SignUpFirstStepState>({
    mode: 'onBlur',
    defaultValues: defaultValues || {
      fullName: '',
      email: '',
    },
    resolver: zodResolver(signUpFirstStepSchema),
  })

  return (
    <>
      <View style={styles.bottomContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>

         <Controller
            control={control}
            name='fullName'
            render={({
              field: { value, onChange },
              fieldState: { error },
            }) => (
              <View style={styles.formFieldContainer}>
                <Text style={styles.formFieldLabel}>Full name</Text>
                <AppTextField
                  ref={fullNameInputRef}
                  containerStyle={styles.formFieldInput}
                  autoCapitalize='words'
                  placeholder='Vasia Pupkin'
                  value={value}
                  leftAdornment={
                    <UserRound />
                  }
                  onChangeText={onChange}
                />
                {getErrorMessageJsx(error?.message)}
              </View>
            )}
          />
              
          <Controller
            control={control}
            name='email'
            render={({
              field: { value, onChange },
              fieldState: { error },
            }) => (
              <View style={styles.formFieldContainer}>
                <Text style={styles.formFieldLabel}>Email</Text>
                <AppTextField
                  ref={emailInputRef}
                  containerStyle={styles.formFieldInput}
                  placeholder='vasiapupkin@whatever.com'
                  value={value}
                  autoComplete='email'
                  inputMode='email'
                  leftAdornment={
                    <AtSign />
                  }
                  onChangeText={onChange}
                />
                {getErrorMessageJsx(error?.message)}
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
    </>
  )
}

export default SignUpFormFirstStep
