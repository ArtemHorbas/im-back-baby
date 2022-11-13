import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserModel } from '../../user/models/user.model'

export class AuthUserResponse {
	@ApiProperty()
	user: UserModel

	@ApiProperty()
	@IsString()
	token: string
}
