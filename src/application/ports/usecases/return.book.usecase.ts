import { BookStatusResponse } from '../../../shared/types/response.types';

export default interface ReturnBookUseCase {
  handle(bookId: string): Promise<BookStatusResponse>;
}
