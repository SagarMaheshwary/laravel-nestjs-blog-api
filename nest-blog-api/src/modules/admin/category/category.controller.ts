import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async index(@Query('page') page: number, @Query('per_page') perPage: number) {
    const categories = await this.categoryService.paginated(page, perPage);

    return response({ categories });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() dto: CreateCategoryDTO) {
    const category = await this.categoryService.save(dto);

    return response({ category }, 'Created a new category.');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number) {
    const category = await this.categoryService.findOne(id);

    return response({ category });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDTO) {
    const category = await this.categoryService.update(
      await this.categoryService.findOne(id),
      dto,
    );

    return response({ category }, 'Selected category has been updated.');
  }
}
