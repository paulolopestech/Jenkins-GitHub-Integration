import { container } from 'tsyringe';
import CreateBookController from '../adapters/controllers/create.book.controller';
import CreateBookService from '../application/services/create.book.service';

const MakeCreateBookController = (): CreateBookController => {
  container.resolve(CreateBookService);
  return container.resolve(CreateBookController);
};

export default MakeCreateBookController;
