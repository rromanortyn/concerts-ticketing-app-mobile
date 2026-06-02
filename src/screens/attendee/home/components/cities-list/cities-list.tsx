import { FC } from 'react'
import { FlatList } from 'react-native'

import CitySuggestion from '../city-suggestion/city-suggestion'

import styles from './styles'

interface CitiesListProps {
  items: {
    id: number,
    name: string,
  }[],
  onItemPress: (id: number) => void,
}

const CitiesList: FC<CitiesListProps> = (props) => {
  const { items, onItemPress } = props
  return (
    <FlatList
      style={styles.flatList}
      data={items}
      renderItem={({ item, index }) => (
        <CitySuggestion
          name={item.name}
          hasDivider={index !== items.length - 1}
          onPress={() => onItemPress(item.id)}
        />
      )}
      keyExtractor={(item) => `${item.id}`}
    />
  )
}

export default CitiesList
