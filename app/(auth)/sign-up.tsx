import { useRef, useState } from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  AtSign,
  Lock,
  UserRound,
} from 'lucide-react-native'

import AppButton from '@/components/elements/app-button/app-button'
import AppTextField from '@/components/elements/app-text-field/app-text-field'
import styles from '@/screens/auth/sign-up/styles'

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const fullNameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* <KeyboardAwareScrollView
          bottomOffset={20}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="handled"
        > */}
            <View style={styles.topContainer}>
              <Text style={styles.title}>Sign Up</Text>
            </View>

            <View style={styles.bottomContainer}>
              <AppTextField
                ref={fullNameInputRef}
                containerStyle={{ marginBottom: 20 }}
                placeholder='Full name'
                value={fullName}
                leftAdornment={
                  <UserRound style={{ marginLeft: 20 }} />
                }
                onChangeText={setFullName}
              />
              <AppTextField
                ref={emailInputRef}
                containerStyle={{ marginBottom: 20 }}
                placeholder='Email'
                value={email}
                leftAdornment={
                  <AtSign style={{ marginLeft: 20 }} />
                }
                onChangeText={setEmail}
              />
              <AppTextField
                ref={passwordInputRef}
                containerStyle={{ marginBottom: 20 }}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                type='password'
                leftAdornment={
                  <Lock style={{ marginLeft: 20 }} />
                }
              />
              <AppTextField
                ref={confirmPasswordInputRef}
                containerStyle={{ marginBottom: 20 }}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                type='password'
                leftAdornment={
                  <Lock style={{ marginLeft: 20 }} />
                }
              />
              <AppButton
                title='Continue'
                onPress={() => {}}
                type='primary'
              />
            </View>
          {/* </KeyboardAwareScrollView> */}
      </View>
    </SafeAreaView>
  )
}

export default SignUp

