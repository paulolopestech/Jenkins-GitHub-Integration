import { container } from 'tsyringe';

import UserRepository from '../application/ports/resources/user.repository';
import BookRepository from '../application/ports/resources/book.repository';

import UserMongoAdapter from '../adapters/infrastructure/mongo/user.mongo.adapter';
import BookMongoAdapter from '../adapters/infrastructure/mongo/book.mongo.adapter';

import CreateUserService from '../application/services/create.user.service';
import CreateUserUseCase from '../application/ports/usecases/create.user.usecase';
import AuthUserUseCase from '../application/ports/usecases/auth.user.usecase';
import AuthUserService from '../application/services/auth.user.service';

import CreateBookService from '../application/services/create.book.service';
import CreateBookUseCase from '../application/ports/usecases/create.book.usecase';
import GetBooksUseCase from '../application/ports/usecases/get.books.usecase';
import GetBooksService from '../application/services/get.books.service';
import BorrowBookUseCase from '../application/ports/usecases/borrow.book.usecase';
import BorrowBookService from '../application/services/borrow.book.service';
import ReturnBookUseCase from '../application/ports/usecases/return.book.usecase';
import ReturnBookService from '../application/services/return.book.service';
import DeleteBookUseCase from '../application/ports/usecases/delete.book.usecase';
import DeleteBookService from '../application/services/delete.book.service';

container.registerSingleton<UserRepository>(
  'UserRepository',
  UserMongoAdapter,
);

container.registerSingleton<BookRepository>(
  'BookRepository',
  BookMongoAdapter,
);

container.registerSingleton<CreateUserUseCase>(
  'CreateUserUseCase',
  CreateUserService,
);

container.registerSingleton<AuthUserUseCase>(
  'AuthUserUseCase',
  AuthUserService,
);

container.registerSingleton<CreateBookUseCase>(
  'CreateBookUseCase',
  CreateBookService,
);

container.registerSingleton<GetBooksUseCase>(
  'GetBooksUseCase',
  GetBooksService,
);

container.registerSingleton<BorrowBookUseCase>(
  'BorrowBookUseCase',
  BorrowBookService,
);

container.registerSingleton<ReturnBookUseCase>(
  'ReturnBookUseCase',
  ReturnBookService,
);

container.registerSingleton<DeleteBookUseCase>(
  'DeleteBookUseCase',
  DeleteBookService,
);