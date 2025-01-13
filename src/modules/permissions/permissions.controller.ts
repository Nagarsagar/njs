import { UpdatePermissionDto } from './dto/permission-update-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsDto } from './dto/permissions-dto';

@Controller('/api/v1/permissions')
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ description: 'Create a new permission' })
  @ApiBody({
    type: PermissionsDto,
    examples: {
      example1: {
        value: {
          name: 'CREATE',
        },
      },
      example2: {
        value: {
          name: 'READ',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Permission created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
  })
  createPermission(@Body() permission: PermissionsDto) {
    return this.permissionsService.createPermission(permission);
  }

  @Get()
  getPermissions(@Query('name') name: string) {
    return this.permissionsService.getPermissions(name);
  }

  @Put()
  updatePermission(@Body() updatePermission: UpdatePermissionDto) {
    console.log('updatePermission');
    return this.permissionsService.updatePermission(updatePermission);
  }
  @Delete('/:name')
  deletePermission(@Param('name') name: string) {
    return this.permissionsService.deletePermission(name);
  }
}
