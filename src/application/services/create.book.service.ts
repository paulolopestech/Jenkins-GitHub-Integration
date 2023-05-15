import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { error, success } from '../../shared/either';
import { CreateBookResponse } from '../../shared/types/response.types';

import CreateBookUseCase from '../ports/usecases/create.book.usecase';

import BookRepository from '../ports/resources/book.repository';

import { Book } from '../../shared/types/book.types';
import { ValidateCreateBook } from '../../shared/validation/services/book.validators';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

@injectable()
export default class CreateBookService implements CreateBookUseCase {

    constructor(
        @inject('BookRepository')
        private bookRepository: BookRepository,
    ) { }

    async handle(bookData: Book): Promise<CreateBookResponse> {
        const validate: any = ValidateCreateBook.validate(bookData);

        if(validate[0]?.message) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, validate[0].message));
        }

        const id = uuidv4();

        const book = { ...bookData, lend: false, userLendId: '', id };

        const createBookResponse: CreateBookResponse = await this.bookRepository.createBook(book);

        if (createBookResponse.isError())
            return error(createBookResponse.value);

        return success(createBookResponse.value);
    }
}