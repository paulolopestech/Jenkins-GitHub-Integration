import { container } from 'tsyringe';
import BorrowBookController from '../adapters/controllers/borrow.book.controller';
import BorrowBookService from '../application/services/borrow.book.service';

const MakeBorrowBookController = (): BorrowBookController => {
  container.resolve(BorrowBookService);
  return container.resolve(BorrowBookController);
};

export default MakeBorrowBookController;
