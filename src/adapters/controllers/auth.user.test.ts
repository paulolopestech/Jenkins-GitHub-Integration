import 'reflect-metadata';
import { container } from 'tsyringe';
import UserRepository from '../../application/ports/resources/user.repository';
import AuthUserService from '../../application/services/auth.user.service';

import { error, success } from '../../shared/either';
import ApplicationError from '../../shared/error/application.error';
import ErrorTypes from '../../shared/error/error.types';

import { HTTPRequest } from '../../shared/types/http.types';
import { CreateUserResponse, GetUserResponse } from '../../shared/types/response.types';
import { UserDB } from '../../shared/types/user.types';
import AuthUserController from './auth.user.controller';

describe('', () => {
    const OLD_ENV = process.env;

    let request: HTTPRequest = {
        query: null,
        params: null,
        body: {
            email: 'test@email.com',
            password: 'password',
        },
        headers: null,
    };

    beforeEach(() => {
        container.clearInstances();
        jest.resetModules();
        process.env = { ...OLD_ENV };
        request = {
            query: null,
            params: null,
            body: {
                email: 'test@email.com',
                password: 'password',
            },
            headers: null,
        };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    const makeAdapter = {
        success: class Adapter implements UserRepository {
            createUser(user: UserDB): Promise<CreateUserResponse> {
                throw new Error('Method not implemented.');
            }

            async getUserByEmail(email: string): Promise<GetUserResponse> {
                async function returnMockUser(): Promise<UserDB> {
                    return {
                        id: 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa',
                        name: 'Test',
                        password: '$2b$10$DcIPoxSYdp70cyDSiNwyvOXgGDAONhXT36D3HLGAQ4tREAoROoXmi',
                        email: 'test@email.com',
                    }
                }
                const user = await returnMockUser();
                return success(user);
            }
        },
        error: class Adapter implements UserRepository {
            createUser(user: UserDB): Promise<CreateUserResponse> {
                throw new Error('Method not implemented.');
            }
            async getUserByEmail(email: string): Promise<GetUserResponse> {
                return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'ERROR'));
            }
        },
    };

    test('Testing Success Response', async () => {
        process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
        process.env.JWT_EXPIRATION = '86400';

        container.registerSingleton<UserRepository>(
            'UserRepository',
            makeAdapter.success,
        );
        const authUserService = container.resolve(AuthUserService);
        const authUserController = new AuthUserController(
            authUserService,
        );

        const response = await authUserController.handle(request);
        expect(response.statusCode).toBe(200);
    });

    test('Testing Service Error', async () => {
        process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
        process.env.JWT_EXPIRATION = '86400';

        container.registerSingleton<UserRepository>(
            'UserRepository',
            makeAdapter.error,
        );

        const authUserService = container.resolve(AuthUserService);
        const authUserController = new AuthUserController(
            authUserService,
        );

        const response = await authUserController.handle(request);
        expect(response.statusCode).toBe(500);
    });
});