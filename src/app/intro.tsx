import { SafeAreaView } from 'react-native-safe-area-context'

import IntroScreen from '@/screens/intro/intro.screen'

const Intro = () => {
  return (
    <SafeAreaView style={{ height: '100%', paddingHorizontal: 20 }}>
      <IntroScreen />
    </SafeAreaView>
  )
}

export default Intro
