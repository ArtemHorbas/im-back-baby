import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './models/user.model'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

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

	async updateUser(dto: UpdateUserDTO, id: number): Promise<UpdateUserDTO> {
		await this.userRepository.update(dto, { where: { id } })
		return dto
	}

	async deleteUser(id: number) {
		return this.userRepository.destroy({ where: { id } })
	}

	//HELPERS
	async findUserByEmail(email: string): Promise<UserModel> {
		return this.userRepository.findOne({ where: { email } })
	}

	async publicUser(email: string): Promise<UserModel> {
		return this.userRepository.findOne({
			where: { email },
			attributes: {
				exclude: ['password']
			}
		})
	}
}
