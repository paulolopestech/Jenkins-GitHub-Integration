import { Either } from '../either';
import ApplicationError from '../error/application.error';
import { AuthResponse, JwtValidator } from './auth.types';
import { Book, BookDB } from './book.types';
import { UserDB, UserCreateResponse } from './user.types';

export type CreateUserResponse = Either<ApplicationError, UserCreateResponse>;
export type GetUserResponse = Either<ApplicationError, UserDB>;
export type AuthUserResponse = Either<ApplicationError, AuthResponse>;

export type CreateBookResponse = Either<ApplicationError, Book>;
export type BookStatusResponse = Either<ApplicationError, BookDB>;
export type GetBookResponse = Either<ApplicationError, BookDB>;
export type GetBooksResponse = Either<ApplicationError, Array<BookDB>>;
export type DeleteBookResponse = Either<ApplicationError, BookDB>;

export type JwtValidatorResponse = Either<ApplicationError, JwtValidator>;
