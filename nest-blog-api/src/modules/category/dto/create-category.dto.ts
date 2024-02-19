import { IsDefined, Length, Validate } from 'class-validator';
import { UniqueDatabase } from 'src/validators/unique-database';
import { Category } from '../category.entity';
import { BaseDTO } from 'src/modules/app/dto/base.dto';

export class CreateCategoryDTO extends BaseDTO {
  id?: number;

  @IsDefined()
  @Length(3, 100)
  @Validate(UniqueDatabase, [Category])
  title: string;

  @IsDefined()
  @Length(25, 1000)
  description: string;

  image?: string;
}
