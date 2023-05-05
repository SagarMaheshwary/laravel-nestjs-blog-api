import { FindAndCountOptions } from 'sequelize';
import { Model, Sequelize } from 'sequelize-typescript';
import { Paginator as IPaginator } from './interfaces/paginator';

export class Paginator {
  constructor(
    private sequelize: Sequelize,
    private model: new () => Model,
    private findOptions: FindAndCountOptions,
    private currentPage: number = 1,
    private perPage: number = 12,
  ) {}

  async paginate(): Promise<IPaginator> {
    this.findOptions.limit = this.perPage;
    this.findOptions.offset =
      this.currentPage > 1 ? this.perPage * (this.currentPage - 1) : 0;

    //@TODO: dynamically pass model instance
    const { rows, count } = await this.sequelize
      .getRepository(this.model)
      .findAndCountAll(this.findOptions);

    const pages = Math.ceil(count / this.perPage);

    return {
      rows,
      count,
      pages,
      perPage: this.perPage,
      currentPage: this.currentPage,
      prevPage: this.getPrevPage(),
      nextPage: this.getNextPage(pages),
    };
  }

  getPrevPage(): number | null {
    return this.currentPage > 1 ? this.currentPage - 1 : null;
  }

  getNextPage(pages: number): number | null {
    return this.currentPage >= 1 && pages > this.currentPage
      ? this.currentPage + 1
      : null;
  }
}
