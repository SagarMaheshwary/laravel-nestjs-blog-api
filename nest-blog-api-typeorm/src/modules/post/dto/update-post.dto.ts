import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-post.dto';
import { Length, IsDefined } from 'class-validator';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @IsDefined()
  @Length(5, 190)
  //@TODO: validate unique title (ignoring the current row)
  title: string;
}
