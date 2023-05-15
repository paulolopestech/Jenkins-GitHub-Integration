import 'reflect-metadata';
import { container } from 'tsyringe';
import BookRepository from '../../application/ports/resources/book.repository';
import ReturnBookService from '../../application/services/return.book.service';

import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

import { HTTPRequest } from '../../shared/types/http.types';
import { BookStatusResponse, CreateBookResponse, DeleteBookResponse, GetBookResponse, GetBooksResponse } from '../../shared/types/response.types';
import { BookDB } from '../../shared/types/book.types';
import ReturnBookController from './return.book.controller';
import { JwtValidator } from '../../shared/validation/jwt.validator';

jest.mock('../../shared/validation/jwt.validator.ts');

describe('', () => {
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
            userLendId: 'a0d0ecbf-f1e5-4699-918f-4a4ab91b58a1',
            lend: true,
            imageUrl: 'url',
        }

        jest.spyOn(JwtValidator.prototype, 'validate').mockImplementation(() => success({ validation: true }));
    });

    const makeAdapter = {
        success: class Adapter implements BookRepository {
            async createBook(book: BookDB): Promise<CreateBookResponse> {
                throw new Error('Method not implemented.');
            }
            async getBooks(): Promise<GetBooksResponse> {
                throw new Error('Method not implemented.');
            }
            async findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                throw new Error('Method not implemented.');
            }
            async updateBookStatus(bookId: string, userLendId: string, isLend: boolean): Promise<BookStatusResponse> {
                bookMock.lend = false;
                bookMock.userLendId = '';
                return success(bookMock);                 
            }
            async deleteBook(bookId: string): Promise<DeleteBookResponse> {
                throw new Error('Method not implemented.');
            }
        },
        error: class Adapter implements BookRepository {
            async createBook(book: BookDB): Promise<CreateBookResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
            async getBooks(): Promise<GetBooksResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
            async findBookByIdAndOwnerId(bookId: string, ownerId: string): Promise<GetBookResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
            async updateBookStatus(bookId: string, userLendId: string, isLend: boolean): Promise<BookStatusResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
            async deleteBook(bookId: string): Promise<DeleteBookResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
        },
    };

    test('Testing Success Response', async () => {

        container.registerSingleton<BookRepository>(
            'BookRepository',
            makeAdapter.success,
        );

        const returnBookService = container.resolve(ReturnBookService);
        const returnBookController = new ReturnBookController(
            returnBookService,
        );

        const response = await returnBookController.handle(request);
        expect(response.statusCode).toBe(200);
    });

    test('Testing Authentication Error', async () => {
        jest.spyOn(JwtValidator.prototype, 'validate').mockImplementation(() => error(new ApplicationError(ErrorTypes.AUTHENTICATION_ERROR, 'Invalid token.')));
        container.registerSingleton<BookRepository>(
            'BookRepository',
            makeAdapter.success,
        );

        const returnBookService = container.resolve(ReturnBookService);
        const returnBookController = new ReturnBookController(
            returnBookService,
        );

        const response = await returnBookController.handle(request);
        expect(response.statusCode).toBe(500);
    });

    test('Testing Service Error', async () => {
        container.registerSingleton<BookRepository>(
            'BookRepository',
            makeAdapter.error,
        );

        const returnBookService = container.resolve(ReturnBookService);
        const returnBookController = new ReturnBookController(
            returnBookService,
        );

        const response = await returnBookController.handle(request);
        expect(response.statusCode).toBe(500);
    });
});