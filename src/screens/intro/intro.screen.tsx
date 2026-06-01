import { FC } from 'react'
import { Text, View } from 'react-native'

import { Link, useRouter } from 'expo-router'

import AppButton from '@/components/elements/app-button/app-button'
import AppTypography from '@/components/elements/app-typography/app-typography'

import styles from './styles'

const IntroScreen: FC = () => {
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <AppTypography
          style={styles.title}
          variant='h1'
          text='Welcome to EventJoy'
        />
        <AppTypography
          style={styles.subtitle}
          variant='subtitle'
          text='Create an account and experience seamless event planning.'
        />
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
          onPress={() => {
            router.push('/(auth)/login')
          }}
          intent='primary'
          variant='outlined'
        />

        <Link href='/storybook'>
          <Text style={styles.openStorybookText}>Open Storybook</Text>
        </Link>
      </View>
    </View>
  )
}

export default IntroScreen