import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionsDto {
  @ApiProperty({
    name: 'name',
    description: 'Permission name',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
