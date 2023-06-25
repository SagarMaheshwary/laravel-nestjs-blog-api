import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Comment } from '../comment/comment.entity';
import { Like } from '../like/like.entity';

@Entity({
  name: 'posts',
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Exclude()
  @Column()
  image: string;

  @Column()
  user_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'post_category',
    joinColumn: {
      name: 'post_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
