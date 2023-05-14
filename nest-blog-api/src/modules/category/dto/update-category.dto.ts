import { IsDefined, Length, Validate } from 'class-validator';
import { CreateCategoryDTO } from './create-category.dto';
import { UniqueDatabase } from 'src/validators/unique-database';
import { Category } from '../category.model';

export class UpdateCategoryDTO extends CreateCategoryDTO {
  @IsDefined()
  @Length(3, 100)
  //@TODO: validate unique title (ignoring the current row)
  title: string;
}
