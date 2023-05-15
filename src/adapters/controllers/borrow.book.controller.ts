import { inject, injectable } from 'tsyringe';
import ErrorHandler from '../../shared/error/error.handler';
import ErrorHandlerResponse from '../../shared/error/error.handler.response';
import HTTPStatusCodes from '../../shared/http.status.codes';
import { HTTPRequest, HTTPResponse } from '../../shared/types/http.types';
import { BookStatusResponse } from '../../shared/types/response.types';
import Controller from './controller';
import BorrowBookUseCase from '../../application/ports/usecases/borrow.book.usecase';
import { JwtValidator } from '../../shared/validation/jwt.validator';

@injectable()
export default class BorrowBookController implements Controller {
  constructor(
    @inject('BorrowBookUseCase')
    private borrowBook: BorrowBookUseCase,
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

    const {userId, bookId} = request.body

    const borrowBookResponse: BookStatusResponse = await this.borrowBook.handle(bookId, userId);

    if (borrowBookResponse.isError()) {
      const errorHandlerResponse: ErrorHandlerResponse = ErrorHandler.handle(
        borrowBookResponse.value,
      );
      return {
        statusCode: errorHandlerResponse.statusCode,
        body: errorHandlerResponse.payload,
      };
    }

    return {
      statusCode: HTTPStatusCodes.SUCCESS,
      body: borrowBookResponse.value,
    };
  }
}
