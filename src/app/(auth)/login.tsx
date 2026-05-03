import {
  View
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'

import LoginScreen from '@/screens/auth/login/login.screen'

import styles from '@/screens/auth/login/styles'

const Login = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          bottomOffset={16}
          style={styles.keyboardAwareScrollView}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <LoginScreen />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Login
