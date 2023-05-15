import { container } from 'tsyringe';
import ReturnBookController from '../adapters/controllers/return.book.controller';
import ReturnBookService from '../application/services/return.book.service';

const MakeReturnBookController = (): ReturnBookController => {
  container.resolve(ReturnBookService);
  return container.resolve(ReturnBookController);
};

export default MakeReturnBookController;
