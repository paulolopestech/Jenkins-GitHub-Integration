import { inject, injectable } from 'tsyringe';
import { error, success } from '../../shared/either';
import { BookStatusResponse } from '../../shared/types/response.types';

import ReturnBookUseCase from '../ports/usecases/return.book.usecase';
import BookRepository from '../ports/resources/book.repository';
import { ValidateReturnBook } from '../../shared/validation/services/book.validators';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

@injectable()
export default class ReturnBookService implements ReturnBookUseCase {
    constructor(
        @inject('BookRepository')
        private bookRepository: BookRepository,
    ){}

    async handle(bookId: string): Promise<BookStatusResponse> {

        const validate: any = ValidateReturnBook.validate({bookId});

        if(validate[0]?.message) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, validate[0].message));
        }

        const lend = false;
        const userID = '';

        const borrowBookResponse: BookStatusResponse = await this.bookRepository.updateBookStatus(bookId, userID, lend);
        if(borrowBookResponse.isError())
            return error(borrowBookResponse.value);

        return success(borrowBookResponse.value);
    }
}