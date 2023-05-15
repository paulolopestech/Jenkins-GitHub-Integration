import { inject, injectable } from 'tsyringe';
import ErrorHandler from '../../shared/error/error.handler';
import ErrorHandlerResponse from '../../shared/error/error.handler.response';
import HTTPStatusCodes from '../../shared/http.status.codes';
import { HTTPRequest, HTTPResponse } from '../../shared/types/http.types';
import { CreateBookResponse } from '../../shared/types/response.types';
import Controller from './controller';
import CreateBookUseCase from '../../application/ports/usecases/create.book.usecase';
import { JwtValidator } from '../../shared/validation/jwt.validator';

@injectable()
export default class CreateBookController implements Controller {
  constructor(
    @inject('CreateBookUseCase')
    private createBook: CreateBookUseCase,
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

    const {name, ownerName, ownerId, imageUrl} = request.body;
    const book = {name, ownerName, ownerId, imageUrl};

    const createBookResponse: CreateBookResponse = await this.createBook.handle(book);

    if (createBookResponse.isError()) {
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        createBookResponse.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    return {
      statusCode: HTTPStatusCodes.SUCCESS,
      body: createBookResponse.value,
    };
  }
}
