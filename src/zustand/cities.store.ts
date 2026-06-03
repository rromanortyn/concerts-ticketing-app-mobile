import { create } from 'zustand'

interface CityState {
  id: number,
  name: string,
}

interface CitiesState {
  cities: CityState[],
  setCities: (cities: CityState[]) => void,
}

const useCitiesStore = create<CitiesState>((set) => ({
  cities: [],
  setCities: (cities: CityState[]) => set({ cities }),
}))

export default useCitiesStore
