import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDTO } from '../user/dto'
import { AppError } from '../../utils/constants/error'
import * as bcrypt from 'bcrypt'
import { UserLoginDTO } from './dto'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {
	}

	async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (existUser) throw new BadRequestException(AppError.USER_EXIST)

		dto.password = await this.hashPassword(dto.password)

		return this.userService.createUser(dto)
	}

	async loginUser(dto: UserLoginDTO): Promise<CreateUserDTO> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

		const validatePassword = await bcrypt.compare(dto.password, existUser.password)
		if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)

		return existUser
	}

	//HELPERS
	async hashPassword(password) {
		return bcrypt.hash(password, 10)
	}
}
