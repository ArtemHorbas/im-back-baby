import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../modules/user/models/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(UserModel)
		private readonly userRepository: typeof UserModel
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('secret_jwt')
		})
	}

	async validate({ id }: Pick<UserModel, 'id'>) {
		return this.userRepository.findOne({ where: { id } })
	}
}
