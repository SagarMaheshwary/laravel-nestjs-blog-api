import { IsDefined, Length } from 'class-validator';

export class CreateCommentDTO {
  @IsDefined()
  @Length(5, 5000)
  body: string;
}
