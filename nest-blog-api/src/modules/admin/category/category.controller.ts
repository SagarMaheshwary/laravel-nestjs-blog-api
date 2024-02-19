import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CURRENT_PAGE, PER_PAGE } from 'src/constants/common';
import { response } from 'src/helpers/common';
import { RequestContextInterceptor } from 'src/modules/app/request-context.interceptor';
import { StripContextPipe } from 'src/modules/app/strip-context.pipe';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CategoryService } from 'src/modules/category/category.service';
import { CreateCategoryDTO } from 'src/modules/category/dto/create-category.dto';
import { UpdateCategoryDTO } from 'src/modules/category/dto/update-category.dto';
import { Role } from 'src/modules/user/enum/role.enum';

@UseGuards(RolesGuard)
@Roles(Role.admin)
@Controller()
export class CategoryController {
  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async index(
    @Query('page', new DefaultValuePipe(CURRENT_PAGE)) page: number,
    @Query('per_page', new DefaultValuePipe(PER_PAGE)) perPage: number,
  ) {
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
  @UseInterceptors(RequestContextInterceptor)
  async update(
    @Param('id') id: number,
    @Body(StripContextPipe) dto: UpdateCategoryDTO,
  ) {
    let category = await this.categoryService.findOne(id);
    category = await this.categoryService.update(category, dto);

    return response({ category }, 'Selected category has been updated.');
  }
}
