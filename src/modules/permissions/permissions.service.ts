import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permissions.schemas';
import { Model } from 'mongoose';
import { PermissionsDto } from './dto/permissions-dto';
import { UpdatePermissionDto } from './dto/permission-update-dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async createPermission(permission: PermissionsDto) {
    const permissionExists = await this.findPermissionbyName(permission.name);
    if (permissionExists) {
      throw new ConflictException('Permission already exists');
    }

    const p = new this.permissionModel(permission);
    return p.save();
  }

  async getPermissions(name: string) {
    const filter = {};
    if (name) {
      filter['name'] = {
        $regex: name.trim,
        $options: 'i',
      };
    }
    return this.permissionModel.find(filter);
  }

  async updatePermission(updatePermission: UpdatePermissionDto) {
    const permissionExists = await this.findPermissionbyName(
      updatePermission.originalName,
    );

    const newPermissionExists = await this.findPermissionbyName(
      updatePermission.newName,
    );
    if (permissionExists && !newPermissionExists) {
      await permissionExists.updateOne({
        name: updatePermission.newName,
      });
      return this.permissionModel.findById(permissionExists._id);
    } else if (!permissionExists) {
      return this.createPermission({
        name: updatePermission.newName,
      } as PermissionsDto);
    }
    throw new ConflictException('No se pudo actualizar el registro');
  }

  async deletePermission(name: string) {
    const permissionExists = await this.findPermissionbyName(name);

    if (permissionExists) {
      return this.permissionModel.deleteOne({ name });
    } else {
      throw new ConflictException('No se pudo eliminar el registro');
    }
  }

  findPermissionbyName(name: string) {
    return this.permissionModel.findOne({ name });
  }
}
