import { container } from 'tsyringe';
import DeleteBookController from '../adapters/controllers/delete.book.controller';
import DeleteBookService from '../application/services/delete.book.service';

const MakeDeleteBookController = (): DeleteBookController => {
  container.resolve(DeleteBookService);
  return container.resolve(DeleteBookController);
};

export default MakeDeleteBookController;
