import { useRef } from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AtSign,
  UserRound
} from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import AppButton from '@/components/elements/app-button/app-button'
import AppTextField from '@/components/elements/app-text-field/app-text-field'
import styles from '@/screens/auth/sign-up/styles'

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required'),
  email: z
    .email('Invalid email'),
})

interface SignUpFormState {
  fullName: string,
  email: string,
}

const getErrorMessage = (message?: string) => {
  const jsx = message ? <Text style={styles.errorMessage}>{message}</Text> : null

  return jsx
}

const SignUp = () => {
  const fullNameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormState) => {
    console.log(data)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          bottomOffset={16}
          style={styles.keyboardAwareScrollView}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.bottomContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Sign</Text>
              <Text style={styles.titleUp}>Up</Text>
            </View>

            <Text style={styles.subtitle}>Create your account to get started</Text>

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
                      <UserRound style={styles.icon} />
                    }
                    onChangeText={onChange}
                  />
                  {getErrorMessage(error?.message)}
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
                      <AtSign style={styles.icon} />
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
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
