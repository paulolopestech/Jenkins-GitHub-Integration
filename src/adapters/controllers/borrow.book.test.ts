import 'reflect-metadata';
import { container } from 'tsyringe';
import BookRepository from '../../application/ports/resources/book.repository';
import BorrowBookService from '../../application/services/borrow.book.service';

import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

import { HTTPRequest } from '../../shared/types/http.types';
import { BookStatusResponse, CreateBookResponse, DeleteBookResponse, GetBookResponse, GetBooksResponse } from '../../shared/types/response.types';
import { BookDB } from '../../shared/types/book.types';
import BorrowBookController from './borrow.book.controller';
import {JwtValidator} from '../../shared/validation/jwt.validator';

jest.mock('../../shared/validation/jwt.validator.ts');

describe('', () => {

    const OLD_ENV = process.env;
    const xAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxNzViNzQwLTNmY2QtNGI1Yi1hZmI2LWVhZTI4OTliOThlOCIsImlhdCI6MTY3MzM3OTMyMCwiZXhwIjoxNjczMzc5NDA2fQ.05hcsjd3E3xIM20VV0b0puNZJF8pYNVlKa7lLHwZx44';

    let request: HTTPRequest = {
        query: null,
        params: null,
        body: {
            userId: 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa',
            bookId: '2fbdf6c3-32e2-48d8-9d48-32eabdf4b9dc',
        },
        headers: { 'x-access-token': xAccessToken, },
    };

    let bookMock: BookDB = {
        id: '2fbdf6c3-32e2-48d8-9d48-32eabdf4b9dc',
        name: 'Rápido e Devagar',
        ownerName: 'test',
        ownerId: 'd175b740-3fcd-4b5b-afb6-eae2899b98e8',
        userLendId: '',
        lend: false,
        imageUrl: 'url',
    }

    beforeEach(() => {
        container.clearInstances();
        jest.resetModules();
        process.env = { ...OLD_ENV };
        request = {
            query: null,
            params: null,
            body: {
                userId: 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa',
                bookId: '2fbdf6c3-32e2-48d8-9d48-32eabdf4b9dc',
            },
            headers: { 'x-access-token': xAccessToken, },
        };

        bookMock = {
            id: '2fbdf6c3-32e2-48d8-9d48-32eabdf4b9dc',
            name: 'Rápido e Devagar',
            ownerName: 'test',
            ownerId: 'd175b740-3fcd-4b5b-afb6-eae2899b98e8',
            userLendId: '',
            lend: false,
            imageUrl: 'url',
        };

        jest.spyOn(JwtValidator.prototype, 'validate').mockImplementation(() => success({validation: true}));
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    const makeAdapter = {
        success: class Adapter implements BookRepository {
            createBook(book: BookDB): Promise<CreateBookResponse> {
                throw new Error('Method not implemented.');
            }
            getBooks(): Promise<GetBooksResponse> {
                throw new Error('Method not implemented.');
            }
            findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                throw new Error('Method not implemented.');
            }
            async updateBookStatus(bookId: string, userLendId: string, isLend: boolean): Promise<BookStatusResponse> {
                async function returnMockBook(): Promise<BookDB> {
                    bookMock.lend = true;
                    bookMock.userLendId = '2fbdf6c3-10ef-48d8-9d48-32safef4b9dc'
                    return bookMock;
                }
                const returnBookMock = await returnMockBook();
                return success(returnBookMock);
            }
            deleteBook(bookId: string): Promise<DeleteBookResponse> {
                throw new Error('Method not implemented.');
            }
        },
        error: class Adapter implements BookRepository {
            createBook(book: BookDB): Promise<CreateBookResponse> {
                throw new Error('Method not implemented.');
            }
            getBooks(): Promise<GetBooksResponse> {
                throw new Error('Method not implemented.');
            }
            findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                throw new Error('Method not implemented.');
            }
            async updateBookStatus(bookId: string, userLendId: string, isLend: boolean): Promise<BookStatusResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
            deleteBook(bookId: string): Promise<DeleteBookResponse> {
                throw new Error('Method not implemented.');
            }
        },
    };

    test('Testing Success Response', async () => {
        process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';

        container.registerSingleton<BookRepository>(
            'BookRepository',
            makeAdapter.success,
        );

        const borrowBookService = container.resolve(BorrowBookService);
        const authUserController = new BorrowBookController(
            borrowBookService,
        );

        const response = await authUserController.handle(request);
        expect(response.statusCode).toBe(200);
    });

    test('Testing Authentication Error', async () => {
        process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
        jest.spyOn(JwtValidator.prototype, 'validate').mockImplementation(() => error(new ApplicationError(ErrorTypes.AUTHENTICATION_ERROR, 'Invalid token.')));
        container.registerSingleton<BookRepository>(
            'BookRepository',
            makeAdapter.success,
        );

        const borrowBookService = container.resolve(BorrowBookService);
        const authUserController = new BorrowBookController(
            borrowBookService,
        );

        const response = await authUserController.handle(request);
        expect(response.statusCode).toBe(500);
    });

    test('Testing Service Error', async () => {
        process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
        container.registerSingleton<BookRepository>(
            'BookRepository',
            makeAdapter.error,
        );

        const borrowBookService = container.resolve(BorrowBookService);
        const authUserController = new BorrowBookController(
            borrowBookService,
        );

        const response = await authUserController.handle(request);
        expect(response.statusCode).toBe(500);
    });
});