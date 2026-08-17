import { FC, useEffect, useRef, useState } from 'react'
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AtSign,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'

import AppButton from '@/components/elements/app-button/app-button'
import AppTextField from '@/components/elements/app-text-field/app-text-field'
import AppTypography from '@/components/elements/app-typography/app-typography'
import getErrorMessageJsx from '@/utils/get-error-message-jsx'

import loginFormSchema from './consts/login-form-schema'
import styles from './styles'

interface LoginState {
  email: string,
  password: string,
}

interface LoginFormProps {
  onSubmit: (data: LoginState) => void,
  serverSideErrors: Partial<LoginState>
  defaultValues?: LoginState,
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const {
    onSubmit,
    serverSideErrors,
    defaultValues,
  } = props

  const passwordInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)

  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  useEffect(() => {
    if (serverSideErrors.password) {
      setHasPasswordError(true)
    }
  }, [serverSideErrors.password])

  const {
    control,
    handleSubmit,
  } = useForm<LoginState>({
    mode: 'onBlur',
    defaultValues: defaultValues || {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  })

  const onPasswordEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const onPasswordChange = (value: string, onChange: (...events: any[]) => void) => {
    onChange(value)
    setHasPasswordError(false)
  }

  const passwordInputType = isPasswordVisible ? 'text' : 'password'

  const passwordEyeIcon = isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />
  const passwordRightAdornment = (
    <TouchableWithoutFeedback onPress={onPasswordEyePress}>
      {passwordEyeIcon}
    </TouchableWithoutFeedback>
  )

  const passwordErrorMessageFromBe = hasPasswordError ? serverSideErrors.password : undefined

  return (
    <>
      <View style={styles.bottomContainer}>
        <View style={styles.titleContainer}>
          <AppTypography
            style={styles.title}
            variant='h1'
            text='Login'
          />
        </View>

        <Controller
          control={control}
          name='email'
          render={({
            field: { value, onChange },
            fieldState: { error },
          }) => (
            <View style={styles.formFieldContainer}>
              <AppTypography
                style={styles.formFieldLabel}
                variant='body'
                text='Email'
              />
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

        <Controller
          control={control}
          name='password'
          render={({
            field: { value, onChange },
            fieldState: { error },
          }) => (
            <View style={styles.formFieldContainer}>
              <AppTypography
                style={styles.formFieldLabel}
                variant='body'
                text='Password'
              />
              <AppTextField
                ref={passwordInputRef}
                containerStyle={styles.formFieldInput}
                type={passwordInputType}
                autoCapitalize='none'
                placeholder='Enter your password'
                value={value}
                leftAdornment={<LockIcon />}
                rightAdornment={passwordRightAdornment}
                onChangeText={(value) => onPasswordChange(value, onChange)}
              />
              {getErrorMessageJsx(passwordErrorMessageFromBe ?? error?.message)}
            </View>
          )}
        />
        </View>

        <AppButton
          title='Login'
          onPress={handleSubmit(onSubmit)}
          intent='primary'
          variant='filled'
        />
    </>
  )
}

export default LoginForm
