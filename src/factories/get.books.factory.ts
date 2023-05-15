import { container } from 'tsyringe';
import GetBooksController from '../adapters/controllers/get.books.controller';
import GetBooksService from '../application/services/get.books.service';

const MakeCreateBookController = (): GetBooksController => {
  container.resolve(GetBooksService);
  return container.resolve(GetBooksController);
};

export default MakeCreateBookController;
