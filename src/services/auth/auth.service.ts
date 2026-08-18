import axiosService from './axios.service'

export interface LoginRequestDto {
	email: string,
	password: string,
}

export interface LoginResponseDto {
	accessToken: string,
}

const authService = {
	login: async (dto: LoginRequestDto): Promise<LoginResponseDto | undefined> => {
		const response = await axiosService.post<LoginRequestDto, LoginResponseDto>('/auth/login', dto)

  	return response
	},
}

export default authService
