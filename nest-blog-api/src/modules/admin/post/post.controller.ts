import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { PostService } from 'src/modules/post/post.service';
import { Role } from 'src/modules/user/enum/roles.enum';

@Controller()
@UseGuards(RolesGuard)
@Roles(Role.admin)
export class PostController {
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  @Get()
  index() {
    return this.postService.paginated();
  }
}
