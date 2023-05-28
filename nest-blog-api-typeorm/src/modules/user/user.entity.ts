import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './enum/role.enum';
import { Post } from '../post/post.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role: Role;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
