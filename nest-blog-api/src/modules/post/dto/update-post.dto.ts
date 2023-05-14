import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-post.dto';
import { Length, IsDefined } from 'class-validator';
import { UniqueDatabase } from 'src/validators/unique-database';
import { Post } from '../models/post.model';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @IsDefined()
  @Length(5, 190)
  //@TODO: validate unique title (ignoring the current row)
  title: string;
}
