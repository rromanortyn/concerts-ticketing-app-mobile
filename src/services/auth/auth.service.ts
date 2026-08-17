import axiosInstance from '@/consts/axios-instance'

export interface LoginRequestDto {
	email: string,
	password: string,
}

export interface LoginResponseDto {
	accessToken: string,
}

const authService = {
	login: async (dto: LoginRequestDto): Promise<LoginResponseDto> => {
		const response = await axiosInstance.post('/auth/login', dto)

    return response.data
	},
}

export default authService
