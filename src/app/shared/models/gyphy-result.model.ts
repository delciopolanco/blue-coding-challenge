import { Gyphy } from './gyphy.model';
import { Pagination } from './pagination.model';

export interface GyphyResult {
  data: Array<Gyphy>;
  pagination: Pagination;
}

