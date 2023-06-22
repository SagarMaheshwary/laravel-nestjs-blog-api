import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-post.dto';
import { Length, IsDefined, Validate } from 'class-validator';
import { Post } from '../post.entity';
import { UniqueDatabase } from 'src/validators/unique-database';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @IsDefined()
  @Length(5, 190)
  @Validate(UniqueDatabase, [Post, 'title', 'id'])
  title: string;
}
