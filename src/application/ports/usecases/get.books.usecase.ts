import { GetBooksResponse } from '../../../shared/types/response.types';

export default interface GetBooksUseCase {
  handle(): Promise<GetBooksResponse>;
}
