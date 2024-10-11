import { Body, Controller, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGard } from 'src/guards/auth.guard';
import { User } from 'src/database/entities/User.entity';
import { ClsService } from 'nestjs-cls';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PROFILE_SELECT } from './user.select';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(
    private userService: UserService,
    private cls: ClsService
  ) {}

  @Get('profile')
  @UseGuards(AuthGard)
  async myProfile() {
    let user = await this.cls.get<User>('user');
    return this.userService.findOne({
      where: { id: user.id },
      select: USER_PROFILE_SELECT,
    });
  }

  @Post('profile')
  @UseGuards(AuthGard)
  async updateProfile(@Body() body: UpdateUserDto) {
    return this.userService.updateProfile(body);
  }

  @Get('profile/:id')
  @UseGuards(AuthGard)
  async userProfile(@Param('id') id: number) {
    let user = await this.userService.userProfile(id);
    if (!user) throw new NotFoundException();
    return user;
  }

}
