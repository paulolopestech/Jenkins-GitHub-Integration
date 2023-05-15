import { inject, injectable } from 'tsyringe';
import ErrorHandler from '../../shared/error/error.handler';
import ErrorHandlerResponse from '../../shared/error/error.handler.response';
import HTTPStatusCodes from '../../shared/http.status.codes';
import { HTTPRequest, HTTPResponse } from '../../shared/types/http.types';
import { CreateUserResponse } from '../../shared/types/response.types';
import CreateUserUseCase from '../../application/ports/usecases/create.user.usecase';
import Controller from './controller';

@injectable()
export default class CreateUserController implements Controller {
  constructor(
    @inject('CreateUserUseCase')
    private createUser: CreateUserUseCase,
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    const { name, password, email } = request.body;
    const user = {
        name, password, email
    }

    const createUserResponse: CreateUserResponse =
      await this.createUser.handle(user);

    if (createUserResponse.isError()) {
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        createUserResponse.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    return {
      statusCode: HTTPStatusCodes.SUCCESS,
      body: createUserResponse.value,
    };
  }
}
