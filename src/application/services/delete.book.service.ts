import { inject, injectable } from 'tsyringe';
import { error, success } from '../../shared/either';
import { DeleteBookResponse } from '../../shared/types/response.types';

import DeleteBookUseCase from '../ports/usecases/delete.book.usecase';

import BookRepository from '../ports/resources/book.repository';
import { ValidateDeleteBook } from '../../shared/validation/services/book.validators';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

@injectable()
export default class DeleteBookService implements DeleteBookUseCase {

    constructor(
        @inject('BookRepository')
        private bookRepository: BookRepository,
    ){}

    async handle(bookId: string, ownerId: string): Promise<DeleteBookResponse> {

        const validate: any = ValidateDeleteBook.validate({bookId, ownerId});

        if(validate[0]?.message) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, validate[0].message));
        }

        const bookExists = await this.bookRepository.findBookByIdAndOwnerId(bookId, ownerId);

        if(bookExists.isError())
            return error(bookExists.value);
        const deleteBookResponse: DeleteBookResponse = await this.bookRepository.deleteBook(bookId);

        if(deleteBookResponse.isError())
            return error(deleteBookResponse.value);

        return success(deleteBookResponse.value);
    }
}