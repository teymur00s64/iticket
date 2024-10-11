import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { ClsService } from 'nestjs-cls';
  import { UserService } from 'src/app/users/user.service';
  import { User } from 'src/database/entities/User.entity';
  @Injectable()
  export class ProfileGuard implements CanActivate {
    constructor(
      private userService: UserService,
      private cls: ClsService,
    ) {}
    async canActivate(context: ExecutionContext) {
      let req = context.switchToHttp().getRequest();
      let userId = Number(req.params.userId || req.query.userId);
      if (!userId) throw new NotFoundException('User is not found');
      const myUser = await this.cls.get<User>('user');
      if (myUser.id === userId) return true;
      let user = await this.userService.findOne({
        where: [
          {
            id: userId,
          },
        ],
        select: { id: true },
        relations: ['myFollowers', 'myFollowers.followed'],
      });
      if (!user) return false;
      return true;
    }
  }