import { inject, injectable } from 'tsyringe';
import { error, success } from '../../shared/either';
import { GetBooksResponse } from '../../shared/types/response.types';

import GetBooksUseCase from '../ports/usecases/get.books.usecase';

import BookRepository from '../ports/resources/book.repository';

@injectable()
export default class GetBooksService implements GetBooksUseCase {

    constructor(
        @inject('BookRepository')
        private bookRepository: BookRepository,
    ){}

    async handle(): Promise<GetBooksResponse> {

        const getBookResponse: GetBooksResponse = await this.bookRepository.getBooks();

        if(getBookResponse.isError())
            return error(getBookResponse.value);

        return success(getBookResponse.value);
    }
}