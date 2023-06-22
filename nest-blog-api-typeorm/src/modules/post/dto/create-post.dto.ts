import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsInt,
  Length,
  Validate,
} from 'class-validator';
import { UniqueDatabase } from 'src/validators/unique-database';
import { Post } from '../post.entity';
import { BaseDTO } from 'src/modules/app/dto/base.dto';

export class CreatePostDTO extends BaseDTO {
  id?: number;

  @IsDefined()
  @Length(5, 190)
  @Validate(UniqueDatabase, [Post])
  title: string;

  @IsDefined()
  @Length(100, 20000)
  body: string;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  categories: number[];

  image?: string;
}
