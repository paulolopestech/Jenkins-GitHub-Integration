import { DeleteBookResponse } from '../../../shared/types/response.types';

export default interface DeleteBookUseCase {
  handle(bookId: string, ownerId: string): Promise<DeleteBookResponse>;
}
