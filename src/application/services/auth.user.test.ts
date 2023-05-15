import 'reflect-metadata';
import { container } from 'tsyringe';
import { error, success } from '../../shared/either';

import { CreateUserResponse, GetUserResponse } from '../../shared/types/response.types';
import { UserDB } from '../../shared/types/user.types';
import UserRepository from '../ports/resources/user.repository';
import AuthUserService from './auth.user.service';

describe('Testing User Authentication Service', () => {
  const OLD_ENV = process.env;

  let response = [];
  let authObject = { email: 'test@email.com', password: 'password' };
  beforeEach(() => {
    container.clearInstances();
    jest.resetModules();
    process.env = { ...OLD_ENV };

    response = [{
      _id: "63b00c625e5070f131e6668f",
      id: 'a1c9d04b-2a1a-4d75-b3fc-a44e96e9e4aa',
      name: 'test',
      email: 'test@email.com',
      password: '$2b$10$DcIPoxSYdp70cyDSiNwyvOXgGDAONhXT36D3HLGAQ4tREAoROoXmi',
      __v: 0
    }];

    authObject = { email: 'test@email.com', password: 'password' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const makeSut = (Adapter) => {
    container.registerSingleton<UserRepository>(
      'UserRepository',
      Adapter,
    );
    return container.resolve(AuthUserService);
  };

  const makeAdapter = (createUserResponse: any, getUserByEmailResponse: any) =>
    class MongoAdapter implements UserRepository {
      createUser(user: UserDB): Promise<CreateUserResponse> {
        return createUserResponse;
      }
      getUserByEmail(email: string): Promise<GetUserResponse> {
        return getUserByEmailResponse;
      }
    };

  test('Testing valid input parameters', async () => {
    process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
    process.env.JWT_EXPIRATION = '86400';
    const AuthTestAdapter = makeAdapter(success(response[0]), success(response[0]));
    const sut = makeSut(AuthTestAdapter);

    const testResponse = await sut.handle(authObject);

    expect(testResponse.isSuccess()).toBeTruthy();
  });

  test('Testing invalid input - password', async () => {
    process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
    process.env.JWT_EXPIRATION = '86400';
    const AuthTestAdapter = makeAdapter(success(response[0]), success(response[0]));
    const sut = makeSut(AuthTestAdapter);

    authObject.password = 'wrongPassword';
    const testResponse = await sut.handle(authObject);

    expect(testResponse.isError()).toBeTruthy();
  });

  test('Testing invalid input - email', async () => {
    const AuthTestAdapter = makeAdapter(error(null), error(null));
    const sut = makeSut(AuthTestAdapter);

    authObject.email = 'testW@email.com';
    const testResponse = await sut.handle(authObject);

    expect(testResponse.isError()).toBeTruthy();
  });

  test('Testing invalid input - password - null', async () => {
    process.env.SECRET = '7#x;W]=e&hG*5%k4ECHW;*G@/#RK.6hcP5A=4U@mUh!V&QgPt';
    process.env.JWT_EXPIRATION = '86400';
    const AuthTestAdapter = makeAdapter(success(response[0]), success(response[0]));
    const sut = makeSut(AuthTestAdapter);

    authObject.password = null;
    const testResponse = await sut.handle(authObject);

    expect(testResponse.isError()).toBeTruthy();
  });

  test('Testing invalid input - email - null', async () => {
    const AuthTestAdapter = makeAdapter(error(null), error(null));
    const sut = makeSut(AuthTestAdapter);

    authObject.email = null;
    const testResponse = await sut.handle(authObject);

    expect(testResponse.isError()).toBeTruthy();
  });

  test('Testing repository error', async () => {
    const AuthTestAdapter = makeAdapter(error(null), error(null));
    const sut = makeSut(AuthTestAdapter);

    const testResponse = await sut.handle(authObject);

    expect(testResponse.isError()).toBeTruthy();
  });
});
