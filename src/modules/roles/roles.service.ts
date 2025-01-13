import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from './schemas/roles.schema';
import { PermissionsService } from '../permissions/permissions.service';
import { RoleDto } from './dto/role-dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private permissionService: PermissionsService,
  ) {}

  async createRole(role: RoleDto) {
    const roleExist = await this.roleModel.findOne({ name: role.name });

    if (roleExist) {
      throw new Error('Role already exist');
    }

    const permissionRole: Types.ObjectId[] = [];
    
    if (role.permissions && role.permissions.length > 0) {

      for (const permission of role.permissions) {

        const permissionFound = await this.permissionService.findPermissionbyName(
          permission.name,
        );

        if (!permissionFound) {
          throw new ConflictException(
            `El permiso ${permission.name} no existe`,
          );
        }
        permissionRole.push(permissionFound._id);
      }
    }
    const newRole = new this.roleModel({
      name: role.name,
      permissions: permissionRole,
      });
      return await newRole.save();
  }
}
