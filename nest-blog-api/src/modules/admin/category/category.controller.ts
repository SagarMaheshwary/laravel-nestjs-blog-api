import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CategoryService } from 'src/modules/category/category.service';
import { Role } from 'src/modules/user/enum/roles.enum';

@Controller()
@UseGuards(RolesGuard)
@Roles(Role.admin)
export class CategoryController {
  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  @Get()
  index() {
    return this.categoryService.paginated();
  }
}
