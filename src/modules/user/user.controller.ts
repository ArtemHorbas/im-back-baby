import { Controller } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	// @Post('create-user')
	// createUser(@Body() dto: CreateUserDTO) {
	// 	return this.userService.createUser(dto)
	// }
}
