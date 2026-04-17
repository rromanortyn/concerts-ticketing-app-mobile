import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AppButton from '@/components/elements/app-button/app-button'
import styles from '@/screens/auth/sign-up/styles'

const SignUp = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Welcome to EventJoy</Text>
          <Text style={styles.subtitle}>Create an account and experience seamless event planning.</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={{ marginBottom: 20 }}>
            <Link href='/sign-up'>
              <AppButton title='Create an account' onPress={() => {}} />
            </Link>
          </View>
          <AppButton
            title='Login'
            onPress={() => {}}
            type='secondary'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
