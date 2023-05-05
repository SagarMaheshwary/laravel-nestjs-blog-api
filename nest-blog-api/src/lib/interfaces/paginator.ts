import { Model } from 'sequelize-typescript';

export interface Paginator {
  rows: Model<any, any>[];
  count: number;
  pages: number;
  perPage: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
}
