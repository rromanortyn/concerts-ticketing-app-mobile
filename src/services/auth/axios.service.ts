import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import axiosInstance from '@/consts/axios-instance'
import ServerSideException from '@/shared/server-side-exception'

const axiosService = {
  async post<DataType, ResponseType>(
    url: string,
    data: DataType,
    config?: AxiosRequestConfig,
  ): Promise<ResponseType | undefined> {
    try {
      const response = await axiosInstance.post<DataType, AxiosResponse<ResponseType>>(
        url,
        data,
        config,
      )

      return response.data
    }

    catch (error) {
      if (error instanceof AxiosError && axios.isAxiosError<ServerSideException>(error)) {
				const { response } = error

				throw new ServerSideException({
					code: response?.data.code!,
					message: response?.data.message!,
				})
			}
    }
  },
}

export default axiosService
