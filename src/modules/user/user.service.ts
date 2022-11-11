import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { CreateUserDTO } from './dto'

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userRepository: typeof User) {
	}

	async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
		await this.userRepository.create({
			firstName: dto.firstName,
			userName: dto.userName,
			email: dto.email,
			password: dto.password
		})
		return dto
	}

	//HELPERS
	async findUserByEmail(email: string) {
		return this.userRepository.findOne({ where: { email } })
	}

}
