import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AppButton from '@/components/elements/app-button/app-button'

// <AppButton title='Create an account' /> should be replaced with an AppLink component
// <AppLink href='/sign-up' />
// The AppLink component should have the same styling as the AppButton component
const Index = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#ece8e8', height: '100%', paddingHorizontal: 20 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: '700', fontSize: 22, marginBottom: 12 }}>Welcome to EventJoy</Text>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>Create an account and experience seamless event planning.</Text>
        </View>

        <View style={{ height: 'auto', marginBottom: 35 }}>
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

export default Index
