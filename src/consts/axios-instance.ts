import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import AsyncStorageKey from '@/types/enums/async-storage-key.enum'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.105:4000',
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem(AsyncStorageKey.AccessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
