import 'reflect-metadata';
import { container } from 'tsyringe';
import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';
import { BookDB } from '../../shared/types/book.types';

import { BookStatusResponse, CreateBookResponse, DeleteBookResponse, GetBookResponse, GetBooksResponse } from '../../shared/types/response.types';
import BookRepository from '../ports/resources/book.repository';
import GetBooksService from './get.books.service';

describe('Testing Delete Book Service', () => {
    let response = [];

    beforeEach(() => {
        container.clearInstances();
        jest.resetModules();
        response = [{
            _id: '63b014f7842cdec9cb260a85',
            id: 'c2447901-0afe-470f-a2a6-184bff4ee2cf',
            name: 'BOOK NAME',
            ownerId: 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa',
            userLendId: '',
            lend: false,
            imageUrl: 'url',
            __v: 0
        },
        {
            _id: '63b014f7842cdec9cb26qa85',
            id: 'c2447901-0afe-470f-a2a6-184bff4ee2c1',
            name: 'BOOK NAME 2',
            ownerId: 'a1c9d04b-2a1a-4d75-b3fc-a44e93e9e4aa',
            userLendId: '',
            lend: false,
            imageUrl: 'url',
            __v: 0
        }];
    });

    const makeSut = (Adapter) => {
        container.registerSingleton<BookRepository>(
            'BookRepository',
            Adapter,
        );
        return container.resolve(GetBooksService);
    };

    const makeAdapter = (adapterResponse) =>
        class MongoAdapter implements BookRepository {
            createBook(book: BookDB): Promise<CreateBookResponse> {
                throw new Error('Method not implemented.');
            }
            getBooks(): Promise<GetBooksResponse> {
               return adapterResponse;
            }
            findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                throw new Error('Method not implemented.');
            }
            updateBookStatus(bookId: string, userLendId: string, lend: boolean): Promise<BookStatusResponse> {
                throw new Error('Method not implemented.');
            }
            deleteBook(bookId: string): Promise<DeleteBookResponse> {
                throw new Error('Method not implemented.');
            }

        };

    test('Testing success', async () => {
        const GetBooksTestAdapter = makeAdapter(success(response[0]));
        const sut = makeSut(GetBooksTestAdapter);

        const testResponse = await sut.handle();

        expect(testResponse.isSuccess()).toBeTruthy();
    });

    test('Testing repository error', async () => {
        const GetBooksTestAdapter = makeAdapter(error(new ApplicationError(ErrorTypes.DATABASE_ERROR, '')));
        const sut = makeSut(GetBooksTestAdapter);

        const testResponse = await sut.handle();

        expect(testResponse.isError()).toBeTruthy();
    });
});
