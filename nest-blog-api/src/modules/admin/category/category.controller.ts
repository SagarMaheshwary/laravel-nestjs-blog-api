import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { response } from 'src/helpers/common';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CategoryService } from 'src/modules/category/category.service';
import { CreateCategoryDTO } from 'src/modules/category/dto/create-category.dto';
import { UpdateCategoryDTO } from 'src/modules/category/dto/update-category.dto';
import { Role } from 'src/modules/user/enum/roles.enum';

@Controller()
@UseGuards(RolesGuard)
@Roles(Role.admin)
export class CategoryController {
  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  @Get()
  async index(@Query('page') page: number, @Query('limit') limit: number) {
    const categories = await this.categoryService.paginated(page, limit);

    return response({ categories });
  }

  @Post()
  async store(@Body() categoryDTO: CreateCategoryDTO) {
    const category = await this.categoryService.save(categoryDTO);

    return response({ category }, 'Created a new category.');
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() categoryDTO: UpdateCategoryDTO,
  ) {
    const category = await this.categoryService.update(
      await this.categoryService.findOne(id),
      categoryDTO,
    );

    return response({ category }, 'Selected category has been updated.');
  }
}
