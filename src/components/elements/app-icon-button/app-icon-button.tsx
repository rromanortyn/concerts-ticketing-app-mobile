import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

type AppIconButtonProps = {
	name: keyof typeof Ionicons.glyphMap,
	onPress?: () => void,
} & React.ComponentProps<typeof Ionicons>

const AppIconButton: FC<AppIconButtonProps> = (props) => {
	const {
		name,
		onPress,
		size,
	} = props

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<View style={{
				alignItems: 'center',
				justifyContent: 'center',
				width: 60,
				height: 60,
				padding: 10,
				backgroundColor: '#3C896D',
				borderRadius: 30,
			}}>
				<Ionicons name={name} size={size} color='#FFFFFF' />
			</View>
		</TouchableOpacity>
	)
}

export default AppIconButton
