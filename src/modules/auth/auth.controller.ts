import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDTO } from '../user/dto/create-user.dto'
import { UserLoginDTO } from './dto/user-login.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthUserResponse } from './response/auth.response'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiTags('API')
	@ApiResponse({ status: 201, type: AuthUserResponse })
	@Post('register')
	register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
		return this.authService.registerUser(dto)
	}

	@ApiTags('API')
	@ApiResponse({ status: 200, type: AuthUserResponse })
	@Post('login')
	login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
		return this.authService.loginUser(dto)
	}
}
