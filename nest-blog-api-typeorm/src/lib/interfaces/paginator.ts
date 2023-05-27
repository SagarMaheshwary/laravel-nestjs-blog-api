import { BaseEntity } from 'typeorm';

export interface IPaginator {
  entities: BaseEntity[];
  total: number;
  pages: number;
  per_page: number;
  page: number;
  prev_page: number | null;
  next_page: number | null;
}
