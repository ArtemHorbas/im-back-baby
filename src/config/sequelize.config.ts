import { ConfigService } from '@nestjs/config'
import { UserModel } from '../modules/user/models/user.model'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => ({
	dialect: 'postgres',
	host: configService.get('db_host'),
	port: configService.get('db_port'),
	username: configService.get('db_user'),
	password: configService.get('db_password'),
	database: configService.get('db_name'),
	synchronize: true,
	autoLoadModels: true,
	models: [UserModel]
})
