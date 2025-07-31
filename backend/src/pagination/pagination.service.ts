import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  constructor() {}

  getOffsetValue({
    currentPage,
    itemsPerPage,
  }: {
    currentPage: number;
    itemsPerPage: number;
  }) {
    return (currentPage === 0 ? 0 : currentPage - 1) * itemsPerPage;
  }

  getMetaData({ currentPage, itemsPerPage, totalItems, itemCount }) {
    return {
      currentPage: Number(currentPage),
      itemsPerPage: Number(itemsPerPage),
      totalItems: Number(totalItems),
      totalPages: Math.ceil(Number(totalItems) / Number(itemsPerPage)),
      itemCount: Number(itemCount),
    };
  }
}
