import { FC } from 'react'
import { Text, View } from 'react-native'

import { Link, useRouter } from 'expo-router'

import AppButton from '@/components/elements/app-button/app-button'

import styles from './styles'

const IntroScreen: FC = () => {
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome to EventJoy</Text>
        <Text style={styles.subtitle}>Create an account and experience seamless event planning.</Text>
      </View>

      <View style={styles.bottomContainer}>
        <AppButton
          style={styles.createAnAccountButton}
          title='Create an account'
          onPress={() => {
            router.push('/(auth)/sign-up')
          }}
        />
        <AppButton
          style={styles.loginButton}
          title='Login'
          onPress={() => {}}
          type='secondary'
        />

        <Link href='/storybook'>
          <Text style={styles.openStorybookText}>Open Storybook</Text>
        </Link>
      </View>
    </View>
  )
}

export default IntroScreen