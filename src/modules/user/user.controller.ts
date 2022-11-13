import { Body, Controller, Delete, HttpCode, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import { Auth } from '../../decorators/auth.decorator'
import { User } from '../../decorators/user.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Patch()
	@Auth()
	updateUser(
		@Body() dto: UpdateUserDTO,
		@User('id') id: number
	): Promise<UpdateUserDTO> {
		return this.userService.updateUser(dto, id)
	}

	@HttpCode(200)
	@Delete()
	@Auth()
	deleteUser(@User('id') id: number) {
		return this.userService.deleteUser(id)
	}
}
