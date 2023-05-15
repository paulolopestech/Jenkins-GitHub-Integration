import 'dotenv/config';
import { CreateBookResponse, GetBooksResponse, BookStatusResponse, DeleteBookResponse, GetBookResponse } from '../../../shared/types/response.types';
import { error, success } from '../../../shared/either';
import ErrorTypes from '../../../shared/error/error.types';
import ApplicationError from '../../../shared/error/application.error';
import BookRepository from '../../../application/ports/resources/book.repository';
import { Book, BookDB } from '../../../shared/types/book.types';
import BookModel from '../../../config/database/models/book.model';

export default class BookMongoAdapter implements BookRepository {
  helper(response: any): BookDB {
    const { id, name, ownerName, ownerId, userLendId, lend, imageUrl } = response;
    const book = { id, name, ownerName, ownerId, userLendId, lend, imageUrl };
    return book;
  }

  async createBook(book: BookDB): Promise<CreateBookResponse> {
    try {
      const bookModel = new BookModel(book);
      const { name, ownerName, ownerId, imageUrl } = await bookModel.save();
      const response = { name, ownerName, ownerId, imageUrl };
      return success(response);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }

  async findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
    try {
      const response = BookModel.findOne({ id: bookId, ownerId: ownerId });
      if (!response)
        return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'BOOK NOT FOUND'));

      const book = this.helper(response);
      return success(book);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }

  async getBooks(): Promise<GetBooksResponse> {
    try {
      const response: Array<BookDB> = await BookModel.find({});
      return success(response);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }

  async updateBookStatus(bookId: string, userID: string, isLend: boolean): Promise<BookStatusResponse> {
    try {
      const response = await BookModel.findOneAndUpdate({ id: bookId }, {
        $set: {
          userLendId: userID,
          lend: isLend,
        }
      },
        {
          upsert: true,
          returnDocument: 'after',
        });

      if (!response)
        return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'BOOK NOT FOUND'));

      const book = this.helper(response);
      return success(book);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }

  async deleteBook(bookId: string): Promise<DeleteBookResponse> {
    try {
      const response = await BookModel.findOneAndDelete({ id: bookId });
      const book = this.helper(response);
      return success(book);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }
}
