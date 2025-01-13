import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './configuration/configuration';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    RolesModule,
    PermissionsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [`./env/${process.env.NODE_ENV}.env`],
    }),
    // 'mongodb://admin:123456789@localhost:27017/'
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('mongo.user')}:${configService.get('mongo.password')}@${configService.get('mongo.host')}:${configService.get('mongo.port')}/${configService.get('mongo.database')}?authSource=admin`,
      }),
    }),
  ],
})
export class AppModule {}
