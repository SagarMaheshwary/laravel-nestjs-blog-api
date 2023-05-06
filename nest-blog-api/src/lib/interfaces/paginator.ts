import { Model } from 'sequelize-typescript';

export interface Paginator {
  rows: Model<any, any>[];
  count: number;
  pages: number;
  per_page: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
}
