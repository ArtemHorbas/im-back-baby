import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDTO } from '../user/dto/create-user.dto'
import { AppError } from '../../utils/constants/error'
import * as bcrypt from 'bcrypt'
import { UserLoginDTO } from './dto/user-login.dto'
import { TokenService } from '../token/token.service'
import { AuthUserResponse } from './response/auth.response'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService
	) {}

	async registerUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (existUser) throw new BadRequestException(AppError.USER_EXIST)

		dto.password = await this.hashPassword(dto.password)

		await this.userService.createUser(dto)

		const user = await this.userService.publicUser(dto.email)

		return {
			user,
			token: await this.tokenService.generateJwtToken(user.id)
		}
	}

	async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

		const validatePassword = await bcrypt.compare(
			dto.password,
			existUser.password
		)
		if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)

		return {
			user: await this.userService.publicUser(dto.email),
			token: await this.tokenService.generateJwtToken(existUser.id)
		}
	}

	//HELPERS
	async hashPassword(password) {
		return bcrypt.hash(password, 10)
	}
}
