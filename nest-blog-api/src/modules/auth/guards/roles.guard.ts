import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../user/enum/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from 'src/modules/user/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.log(`REQUIRED ROLES: [${requiredRoles?.join(', ') || ''}] `);

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    this.logger.log(`USER ROLES: ${user?.role}`);

    if (requiredRoles.includes(user?.role)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
