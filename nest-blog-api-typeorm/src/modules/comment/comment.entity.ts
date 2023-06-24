import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity({
  name: 'comments',
})
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parent_id: number;

  @Column()
  post_id: number;

  @Column()
  user_id: number;

  @Column()
  body: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: 'parent_id' })
  comment: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment)
  @JoinColumn({ name: 'parent_id' })
  replies: Comment[];

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
