import { inject, injectable } from 'tsyringe';
import ErrorHandler from '../../shared/error/error.handler';
import ErrorHandlerResponse from '../../shared/error/error.handler.response';
import HTTPStatusCodes from '../../shared/http.status.codes';
import { HTTPRequest, HTTPResponse } from '../../shared/types/http.types';
import { GetBooksResponse } from '../../shared/types/response.types';
import Controller from './controller';
import GetBooksUseCase from '../../application/ports/usecases/get.books.usecase';
import { JwtValidator } from '../../shared/validation/jwt.validator';

@injectable()
export default class GetBooksController implements Controller {
  constructor(
    @inject('GetBooksUseCase')
    private getBooks: GetBooksUseCase,
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    const token = request.headers['x-access-token'];

    const validateJwt = new JwtValidator().validate(token);

    if(validateJwt.isError()){
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        validateJwt.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    const getBooksResponse: GetBooksResponse = await this.getBooks.handle();

    if (getBooksResponse.isError()) {
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        getBooksResponse.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    return {
      statusCode: HTTPStatusCodes.SUCCESS,
      body: getBooksResponse.value,
    };
  }
}
