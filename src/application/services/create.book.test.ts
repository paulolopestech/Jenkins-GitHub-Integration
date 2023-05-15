import 'reflect-metadata';
import { container } from 'tsyringe';
import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';
import { BookDB } from '../../shared/types/book.types';
import { BookStatusResponse, CreateBookResponse, DeleteBookResponse, GetBookResponse, GetBooksResponse } from '../../shared/types/response.types';
import BookRepository from '../ports/resources/book.repository';
import CreateBookService from './create.book.service';

describe('Testing Create Book Service', () => {

    let response = [];
    let mockBook = {
        name: 'name',
        ownerName: "UserName",
        ownerId: "a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa",
        imageUrl: "imageUrl"
    };

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
            imageUrl: 'imageUrl',
            __v: 0
        }];

        mockBook = {
            name: 'name',
            ownerName: "UserName",
            ownerId: "a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa",
            imageUrl: "imageUrl",
        };
    });

    const makeSut = (Adapter) => {
        container.registerSingleton<BookRepository>(
            'BookRepository',
            Adapter,
        );
        return container.resolve(CreateBookService);
    };

    const makeAdapter = (adapterResponse) =>
        class MongoAdapter implements BookRepository {
            createBook(book: BookDB): Promise<CreateBookResponse> {
                return adapterResponse;
            }
            getBooks(): Promise<GetBooksResponse> {
                throw new Error('Method not implemented.');
            }
            findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                throw new Error('Method not implemented.');
            }
            updateBookStatus(bookId: string, userLendId: string, lend: boolean): Promise<BookStatusResponse> {
                return adapterResponse;
            }
            deleteBook(bookId: string): Promise<DeleteBookResponse> {
                throw new Error('Method not implemented.');
            }
        };

    test('Testing valid input parameters', async () => {
        const CreateTestAdapter = makeAdapter(success(response));
        const sut = makeSut(CreateTestAdapter);
        const testResponse = await sut.handle(mockBook);

        expect(testResponse.isSuccess()).toBeTruthy();
    });

    test('Testing invalid input - book name', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);

        mockBook.name = null;

        const testResponse = await sut.handle(mockBook);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input - owner name', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);

        mockBook.ownerName = null;
        const testResponse = await sut.handle(mockBook);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input - ownerId', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);

        mockBook.ownerId = null;
        const testResponse = await sut.handle(mockBook);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing invalid input - imageUrl', async () => {
        const BorrowTestAdapter = makeAdapter(error(null));
        const sut = makeSut(BorrowTestAdapter);

        mockBook.imageUrl = null;
        const testResponse = await sut.handle(mockBook);

        expect(testResponse.isError()).toBeTruthy();
    });

    test('Testing repository error', async () => {
        const TestAdapter = makeAdapter(error(new ApplicationError(ErrorTypes.DATABASE_ERROR, '')));
        const sut = makeSut(TestAdapter);

        const testResponse = await sut.handle(mockBook);

        expect(testResponse.isError()).toBeTruthy();
    });
});
