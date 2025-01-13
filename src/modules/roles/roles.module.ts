import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, roleSchema } from './schemas/roles.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: roleSchema,
      },
    ]),
    PermissionsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
