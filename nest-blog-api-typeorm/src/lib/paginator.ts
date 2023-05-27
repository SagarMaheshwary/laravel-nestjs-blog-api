import { BaseEntity, FindManyOptions, Repository } from 'typeorm';
import { IPaginator } from './interfaces/paginator';

export class Paginator {
  constructor(
    private readonly entityRepository: Repository<BaseEntity>,
    private findOptions: FindManyOptions,
    private page: number = null,
    private perPage: number = 12,
  ) {}

  async paginate(): Promise<IPaginator> {
    this.findOptions.take = this.perPage;
    this.findOptions.skip = this.page > 1 ? this.perPage * (this.page - 1) : 0;

    const [entities, total] = await this.entityRepository.findAndCount(
      this.findOptions,
    );
    const pages = Math.ceil(total / this.perPage);

    return {
      entities,
      total,
      pages,
      per_page: this.perPage,
      page: this.page,
      prev_page: this.getPrevPage(),
      next_page: this.getNextPage(pages),
    };
  }

  getPrevPage(): number | null {
    return this.page > 1 ? this.page - 1 : null;
  }

  getNextPage(pages: number): number | null {
    return this.page >= 1 && pages > this.page ? this.page + 1 : null;
  }
}
