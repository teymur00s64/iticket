import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), [
  'firstName',
  'lastName',
  'number',
  'birthDate',
]) {
  @Type()
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  profilePictureId: number;
}