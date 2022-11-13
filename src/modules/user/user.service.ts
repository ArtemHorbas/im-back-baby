import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './models/user.model'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userRepository: typeof UserModel
	) {}

	async createUser(dto: CreateUserDTO) {
		await this.userRepository.create({
			firstName: dto.firstName,
			userName: dto.userName,
			email: dto.email,
			password: dto.password
		})
	}

	//HELPERS
	async findUserByEmail(email: string) {
		return this.userRepository.findOne({ where: { email } })
	}

	async publicUser(email: string) {
		return this.userRepository.findOne({
			where: { email },
			attributes: {
				exclude: ['password']
			}
		})
	}
}
