import 'reflect-metadata';
import { container } from 'tsyringe';
import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';
import { BookStatusResponse, CreateBookResponse, DeleteBookResponse, GetBookResponse, GetBooksResponse } from '../../shared/types/response.types';
import BookRepository from '../ports/resources/book.repository';
import BorrowBookService from './borrow.book.service';

describe('Testing Borrow Book Service', () => {

    let response = [];
    let userId = '';
    let bookId = '';

    beforeEach(() => {
        container.clearInstances();
        jest.resetModules();
        userId = "a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4bb";
        bookId = "c2447901-0afe-470f-a2a6-184bff4ee2cf";
        response = [{
            "id": "c2447901-0afe-470f-a2a6-184bff4ee2cf",
            "name": "Rápido e Devagar",
            "ownerId": "a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa",
            "userLendId": "a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4bb",
            "lend": true,
            "imageUrl": "url",
            "_id": "63b014f7842cdec9cb260a85",
            "__v": 0
        }]
    });

    const makeSut = (Adapter) => {
        container.registerSingleton<BookRepository>(
            'BookRepository',
            Adapter,
        );
        return container.resolve(BorrowBookService);
    };

    const makeAdapter = (adapterResponse) =>
        class MongoAdapter implements BookRepository {
            createBook(): Promise<CreateBookResponse> {
                throw new Error('Method not implemented.');
            }
            getBooks(): Promise<GetBooksResponse> {
                throw new Error('Method not implemented.');
            }
            findBookByIdAndOwnerId(): Promise<GetBookResponse> {
                throw new Error('Method not implemented.');
            }
            updateBookStatus(): Promise<BookStatusResponse> {
                return adapterResponse;
            }
            deleteBook(): Promise<DeleteBookResponse> {
                throw new Error('Method not implemented.');
            }
        };

    test('Testing valid input parameters', async () => {
        const BorrowTestAdapter = makeAdapter(success(response));
        const sut = makeSut(BorrowTestAdapter);
        const testResponse = await sut.handle(bookId, userId);
        expect(testResponse.isSuccess()).toBeTruthy();
    });

    test('Testing invalid input - bookId', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);
        bookId = 'invalidBookId';

        const testResponse = await sut.handle(bookId, userId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input - bookId - null', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);
        bookId = null;

        const testResponse = await sut.handle(bookId, userId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input - userLendId', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);
        userId = 'invaliduserLendId';

        const testResponse = await sut.handle(bookId, userId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input - userLendId - null', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);
        userId = null;

        const testResponse = await sut.handle(bookId, userId);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing repository error', async () => {
        const TestAdapter = makeAdapter(error(new ApplicationError(ErrorTypes.DATABASE_ERROR, '')));
        const sut = makeSut(TestAdapter);

        const testResponse = await sut.handle(bookId, userId);

        expect(testResponse.isError()).toBeTruthy();
    });
});
