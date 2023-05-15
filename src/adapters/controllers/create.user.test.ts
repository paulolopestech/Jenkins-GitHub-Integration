import 'reflect-metadata';
import { container } from 'tsyringe';
import UserRepository from '../../application/ports/resources/user.repository';
import CreateUserService from '../../application/services/create.user.service';

import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

import { HTTPRequest } from '../../shared/types/http.types';
import { CreateUserResponse, GetUserResponse } from '../../shared/types/response.types';
import { UserDB, } from '../../shared/types/user.types';
import CreateUserController from './create.user.controller';

jest.mock('../../shared/validation/jwt.validator.ts');

describe('', () => {
    let request: HTTPRequest = {
        query: null,
        params: null,
        body: {
            name: 'test',
            password: 'password',
            email: 'test@email.com',
        },
        headers: {

        }
    };

    beforeEach(() => {
        container.clearInstances();
        jest.resetModules();
        request = {
            query: null,
            params: null,
            body: {
                name: 'test',
                password: 'password',
                email: 'test@email.com',
            },
            headers: {},
        };
    });

    const makeAdapter = {
        success: class Adapter implements UserRepository {
            async createUser(user: UserDB): Promise<CreateUserResponse> {
                return success({ email: 'test@email.com', name: 'test' });
            }
            getUserByEmail(email: string): Promise<GetUserResponse> {
                throw new Error('Method not implemented.');
            }
        },
        error: class Adapter implements UserRepository {
            async createUser(user: UserDB): Promise<CreateUserResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'Error'));
            }
            getUserByEmail(email: string): Promise<GetUserResponse> {
                throw new Error('Method not implemented.');
            }
        },
    };

    test('Testing Success Response', async () => {

        container.registerSingleton<UserRepository>(
            'UserRepository',
            makeAdapter.success,
        );

        const createBookService = container.resolve(CreateUserService);
        const createUserController = new CreateUserController(
            createBookService,
        );

        const response = await createUserController.handle(request);
        expect(response.statusCode).toBe(200);
    });

    test('Testing Service Error', async () => {
        process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
        container.registerSingleton<UserRepository>(
            'UserRepository',
            makeAdapter.error,
        );

        const createBookService = container.resolve(CreateUserService);
        const createUserController = new CreateUserController(
            createBookService,
        );

        const response = await createUserController.handle(request);
        expect(response.statusCode).toBe(500);
    });
});