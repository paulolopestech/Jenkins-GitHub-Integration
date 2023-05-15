import { inject, injectable } from 'tsyringe';
import { error, success } from '../../shared/either';
import { BookStatusResponse } from '../../shared/types/response.types';

import BorrowBookUseCase from '../ports/usecases/borrow.book.usecase';
import BookRepository from '../ports/resources/book.repository';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';
import { ValidateBorrowBook } from '../../shared/validation/services/book.validators';

@injectable()
export default class BorrowBookService implements BorrowBookUseCase {
    constructor(
        @inject('BookRepository')
        private bookRepository: BookRepository,
    ){}

    async handle(bookId: string, userId: string): Promise<BookStatusResponse> {
        const validate: any = ValidateBorrowBook.validate({bookId, userId});
        
        if(validate[0]?.message) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, validate[0].message));
        }

        const lend = true;
        const borrowBookResponse: BookStatusResponse = await this.bookRepository.updateBookStatus(bookId, userId, lend);
        if(borrowBookResponse.isError())
            return error(borrowBookResponse.value);

        return success(borrowBookResponse.value);
    }
}