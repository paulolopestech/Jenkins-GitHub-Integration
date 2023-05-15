import { inject, injectable } from 'tsyringe';
import ErrorHandler from '../../shared/error/error.handler';
import ErrorHandlerResponse from '../../shared/error/error.handler.response';
import HTTPStatusCodes from '../../shared/http.status.codes';
import { HTTPRequest, HTTPResponse } from '../../shared/types/http.types';
import Controller from './controller';
import AuthUserUseCase from '../../application/ports/usecases/auth.user.usecase';

@injectable()
export default class AuthUserController implements Controller {
  constructor(
    @inject('AuthUserUseCase')
    private authUser: AuthUserUseCase,
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    const { email, password } = request.body;
    const userData = {email, password}
    const response = await this.authUser.handle(userData);

    if(response.isError()){
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        response.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    return {
      statusCode: HTTPStatusCodes.SUCCESS,
      body: response.value,
    }
  }
}
