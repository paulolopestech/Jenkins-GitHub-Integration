import { BookDB } from '../../../shared/types/book.types';
import { 
  CreateBookResponse, 
  GetBooksResponse, 
  BookStatusResponse, 
  DeleteBookResponse, 
  GetBookResponse 
} from '../../../shared/types/response.types';

export default interface BookRepository {
  createBook(book: BookDB): Promise<CreateBookResponse>;
  getBooks(): Promise<GetBooksResponse>;
  findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse>;
  updateBookStatus(bookId: string, userLendId: string, isLend: boolean): Promise<BookStatusResponse>;
  deleteBook(bookId: string): Promise<DeleteBookResponse>;
}
