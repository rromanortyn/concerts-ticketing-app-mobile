import {
  FC,
  useRef,
  useState,
} from 'react'
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  EyeIcon,
  EyeOffIcon,
  LockIcon
} from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'

import AppButton from '@/components/elements/app-button/app-button'
import AppTextField from '@/components/elements/app-text-field/app-text-field'
import type { SignUpSecondStepSchema } from './consts/sign-up-second-step-schema'
import signUpSecondStepSchema from './consts/sign-up-second-step-schema'

import getErrorMessageJsx from '@/utils/get-error-message-jsx'
import styles from './styles'

interface SignUpFormSecondStepProps {
  onGoBack: (password: string) => void,
  onSubmit: (data: SignUpSecondStepSchema) => void,
  defaultValues?: {
    password: string,
    confirmPassword: string,
  },
}

const SignUpFormSecondStep: FC<SignUpFormSecondStepProps> = (props) => {
  const { onGoBack, onSubmit, defaultValues } = props

  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

  const {
    control,
    trigger,
    getValues,
    handleSubmit,
  } = useForm<SignUpSecondStepSchema>({
    mode: 'onChange',
    defaultValues: defaultValues || {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSecondStepSchema),
  })

  const onPasswordEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const onConfirmPasswordEyePress = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const onPasswordChange = (text: string, onChange: (text: string) => void) => {
    onChange(text)
    
    const confirmValue = getValues('confirmPassword')

    // ONLY trigger validation on the second field if it's not empty.
    // This prevents the minLength error from appearing on an empty field
    // while the user is still filling out the first one.
    if (confirmValue && confirmValue.length > 0) {
      trigger('confirmPassword')
    }
  }

  const passwordInputType = isPasswordVisible ? 'text' : 'password'
  const confirmPasswordInputType = isConfirmPasswordVisible ? 'text' : 'password'

  const passwordEyeIcon = isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />
  const confirmPasswordEyeIcon = isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />
  const passwordRightAdornment = (
    <TouchableWithoutFeedback onPress={onPasswordEyePress}>
      {passwordEyeIcon}
    </TouchableWithoutFeedback>
  )
  const confirmPasswordRightAdornment = (
    <TouchableWithoutFeedback onPress={onConfirmPasswordEyePress}>
      {confirmPasswordEyeIcon}
    </TouchableWithoutFeedback>
  )

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
                type={passwordInputType}
                autoCapitalize='none'
                placeholder='Enter your password'
                value={value}
                leftAdornment={<LockIcon />}
                rightAdornment={passwordRightAdornment}
                onChangeText={(text) => onPasswordChange(text, onChange)}
              />
              {getErrorMessageJsx(error?.message)}
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
                type={confirmPasswordInputType}
                autoCapitalize='none'
                placeholder='Confirm password'
                value={value}
                leftAdornment={<LockIcon />}
                rightAdornment={confirmPasswordRightAdornment}
                onChangeText={onChange}
              />
              {getErrorMessageJsx(error?.message)}
            </View>
          )}
        />
      </View>

      <AppButton
        title='Go back'
        onPress={() => onGoBack(getValues('password'))}
        type='secondary'
        leftIcon={<ArrowLeft color='#3C896D' />}
        style={styles.goBackButton}
      />

      <AppButton
        title='Sign up'
        onPress={handleSubmit(onSubmit)}
        type='primary'
      />
    </>
  )
}

export default SignUpFormSecondStep
