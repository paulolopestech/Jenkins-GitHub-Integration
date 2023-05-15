import { BookStatusResponse } from '../../../shared/types/response.types';

export default interface BorrowBookUseCase {
  handle(bookId: string, userId: string): Promise<BookStatusResponse>;
}
