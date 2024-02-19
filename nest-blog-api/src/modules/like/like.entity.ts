import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity({
  name: 'likes',
})
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  likeable_id: number;

  @Column()
  likeable_type: string;

  @Column()
  user_id: number;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  @JoinColumn({ name: 'likeable_id' })
  comment: Comment;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'likeable_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
