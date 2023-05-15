import { inject, injectable } from 'tsyringe';
import ErrorHandler from '../../shared/error/error.handler';
import ErrorHandlerResponse from '../../shared/error/error.handler.response';
import HTTPStatusCodes from '../../shared/http.status.codes';
import { HTTPRequest, HTTPResponse } from '../../shared/types/http.types';
import { DeleteBookResponse } from '../../shared/types/response.types';
import Controller from './controller';
import { JwtValidator } from '../../shared/validation/jwt.validator';
import DeleteBookUseCase from '../../application/ports/usecases/delete.book.usecase';

@injectable()
export default class DeleteBookController implements Controller {
  constructor(
    @inject('DeleteBookUseCase')
    private deleteBook: DeleteBookUseCase,
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

    const {bookId, userId} = request.body;
    const ownerId = userId;

    const deleteBookResponse: DeleteBookResponse = await this.deleteBook.handle(bookId, ownerId);

    if (deleteBookResponse.isError()) {
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        deleteBookResponse.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    return {
      statusCode: HTTPStatusCodes.SUCCESS,
      body: deleteBookResponse.value,
    };
  }
}
