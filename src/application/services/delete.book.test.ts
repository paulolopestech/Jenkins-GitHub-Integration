import 'reflect-metadata';
import { container } from 'tsyringe';
import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';
import { BookDB } from '../../shared/types/book.types';

import { BookStatusResponse, CreateBookResponse, DeleteBookResponse, GetBookResponse, GetBooksResponse } from '../../shared/types/response.types';
import BookRepository from '../ports/resources/book.repository';
import DeleteBookService from './delete.book.service';

describe('Testing Delete Book Service', () => {

    let mockBookId = 'c2447901-0afe-470f-a2a6-184bff4ee2cf'; 
    let mockOwnerId = 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa';
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
        }];

        mockBookId = 'c2447901-0afe-470f-a2a6-184bff4ee2cf'; 
        mockOwnerId = 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa';
    });

    const makeSut = (Adapter) => {
        container.registerSingleton<BookRepository>(
            'BookRepository',
            Adapter,
        );
        return container.resolve(DeleteBookService);
    };

    const makeAdapter = (findBookResponse: any, deleteBookResponse: any) =>
        class MongoAdapter implements BookRepository {
            createBook(book: BookDB): Promise<CreateBookResponse> {
                throw new Error('Method not implemented.');
            }
            getBooks(): Promise<GetBooksResponse> {
                throw new Error('Method not implemented.');
            }
            findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                return findBookResponse;
            }
            updateBookStatus(bookId: string, userLendId: string, lend: boolean): Promise<BookStatusResponse> {
                throw new Error('Method not implemented.');
            }
            deleteBook(bookId: string): Promise<DeleteBookResponse> {
                return deleteBookResponse;
            }
        };

    test('Testing valid input parameters', async () => {
        const DeleteBookTestAdapter = makeAdapter(success(response[0]), success(response[0]));
        const sut = makeSut(DeleteBookTestAdapter);

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isSuccess()).toBeTruthy();
    });

    test('Testing invalid input parameters - mockBookId', async () => {
        const DeleteBookTestAdapter = makeAdapter(error(response[0]), success(response[0]));
        const sut = makeSut(DeleteBookTestAdapter);
        mockBookId = 'wrongId';

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input parameters - mockBookId - null', async () => {
        const DeleteBookTestAdapter = makeAdapter(error(response[0]), success(response[0]));
        const sut = makeSut(DeleteBookTestAdapter);
        mockBookId = null;

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input parameters - mockOwnerId', async () => {
        const DeleteBookTestAdapter = makeAdapter(error(response[0]), success(response[0]));
        const sut = makeSut(DeleteBookTestAdapter);
        mockOwnerId = 'wrongId';

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input parameters - mockOwnerId - null', async () => {
        const DeleteBookTestAdapter = makeAdapter(error(response[0]), success(response[0]));
        const sut = makeSut(DeleteBookTestAdapter);
        mockOwnerId = null;

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing repository error - find', async () => {
        const DeleteBookTestAdapter = makeAdapter(error(new ApplicationError(ErrorTypes.DATABASE_ERROR, '')), error(''));
        const sut = makeSut(DeleteBookTestAdapter);

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing repository error - deleteBook', async () => {
        const DeleteBookTestAdapter = makeAdapter(success(response[0]), error(new ApplicationError(ErrorTypes.DATABASE_ERROR, '')));
        const sut = makeSut(DeleteBookTestAdapter);

        const testResponse = await sut.handle(mockBookId, mockOwnerId);

        expect(testResponse.isError()).toBeTruthy();
    });
});
