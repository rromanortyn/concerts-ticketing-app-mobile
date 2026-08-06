import { FC, useState } from 'react'
import { View } from 'react-native'

import { ChevronRightIcon } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AppButton from '@/components/elements/app-button/app-button'
import AppIconButton from '@/components/elements/app-icon-button/app-icon-button'
import AppTypography from '@/components/elements/app-typography/app-typography'
const Tickets: FC = () => {
  const [count, setCount] = useState<number>(1)

  return (
    <SafeAreaView style={{ height: '100%', paddingHorizontal: 20 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 200,
        marginBottom: 100,
        marginHorizontal: 'auto',
        width: '60%',
      }}>
        <AppIconButton
          name='remove'
          size={24}
          onPress={() => setCount((prev) => Math.max(1, prev - 1))}
        />
        <AppTypography text={count.toString()} variant='body' />
        <AppIconButton
          name='add'
          size={24}
          onPress={() => setCount((prev) => prev + 1)}
        />
      </View>

      <AppButton
        title='Go to payment'
        rightIcon={<ChevronRightIcon color='#F9F9F9' size={24} />}
        onPress={() => {}}
      />
    </SafeAreaView>
  )
}

export default Tickets
