import { Body, Controller, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import { Auth } from '../../utils/decorators/auth.decorator'
import { User } from '../../utils/decorators/user.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Patch()
	updateUser(@Body() dto: UpdateUserDTO, @User() user) {
		return user
	}
}
