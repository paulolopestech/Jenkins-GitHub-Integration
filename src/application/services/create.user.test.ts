import 'reflect-metadata';
import { container } from 'tsyringe';
import { error, success } from '../../shared/either';

import { CreateUserResponse, GetUserResponse } from '../../shared/types/response.types';
import { UserDB } from '../../shared/types/user.types';
import UserRepository from '../ports/resources/user.repository';
import CreateUserService from './create.user.service';

describe('Testing Create User Service', () => {
  const OLD_ENV = process.env;

  let response = [];
  let createObject = { name: 'test', email: 'test@email.com', password: 'password' };
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

    createObject = { name: 'test', email: 'test@email.com', password: 'password' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const makeSut = (Adapter) => {
    container.registerSingleton<UserRepository>(
      'UserRepository',
      Adapter,
    );
    return container.resolve(CreateUserService);
  };

  const makeAdapter = (adapterResponse: any) =>
    class MongoAdapter implements UserRepository {
      createUser(user: UserDB): Promise<CreateUserResponse> {
        return adapterResponse;
      }
      getUserByEmail(email: string): Promise<GetUserResponse> {
        return adapterResponse;
      }
    };

  test('Testing valid input parameters', async () => {
    const CreateUserTestAdapter = makeAdapter(success(response[0]));
    const sut = makeSut(CreateUserTestAdapter);

    const testResponse = await sut.handle(createObject);

    expect(testResponse.isSuccess()).toBeTruthy();
  });

  test('Testing invalid input - password', async () => {
    const CreateUserTestAdapter = makeAdapter(success(response[0]));
    const sut = makeSut(CreateUserTestAdapter);

    createObject.password = null;
    const testResponse = await sut.handle(createObject);

    expect(testResponse.isError()).toBeTruthy();
  });

  test('Testing invalid input - email', async () => {
    const CreateUserTestAdapter = makeAdapter(error(null));
    const sut = makeSut(CreateUserTestAdapter);

    createObject.email = null;
    const testResponse = await sut.handle(createObject);

    expect(testResponse.isError()).toBeTruthy();
  });

  test('Testing repository error', async () => {
    const CreateUserTestAdapter = makeAdapter(error(null));
    const sut = makeSut(CreateUserTestAdapter);

    const testResponse = await sut.handle(createObject);

    expect(testResponse.isError()).toBeTruthy();
  });
});
