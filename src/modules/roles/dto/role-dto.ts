import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PermissionsDto } from 'src/modules/permissions/dto/permissions-dto';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @IsOptional()
  @Type(() => PermissionsDto)
  permissions?: PermissionsDto[] = [];
}
