import { Book } from '../../../shared/types/book.types';
import { CreateBookResponse } from '../../../shared/types/response.types';

export default interface CreateBookUseCase {
  handle(bookData: Book): Promise<CreateBookResponse>;
}
