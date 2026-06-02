import { View } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'

import SignUpScreen from '@/screens/auth/sign-up/sign-up.screen'

import styles from '@/screens/auth/sign-up/styles'

const SignUp = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          bottomOffset={16}
          style={styles.keyboardAwareScrollView}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <SignUpScreen />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
