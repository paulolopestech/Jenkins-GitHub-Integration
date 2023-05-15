import { Router } from 'express';
import HttpAdapter from '../adapters/infrastructure/http.adapter';
import MakeBorrowBookController from '../factories/borrow.book.factory';
import MakeCreateBookController from '../factories/create.book.factory';
import MakeDeleteBookController from '../factories/delete.book.factory';
import MakeGetBooksController from '../factories/get.books.factory';
import MakeReturnBookController from '../factories/return.book.factory';

const bookRoutes = Router();

bookRoutes.post('/create', HttpAdapter(MakeCreateBookController()));
bookRoutes.get('/get/all', HttpAdapter(MakeGetBooksController()));
bookRoutes.patch('/borrow', HttpAdapter(MakeBorrowBookController()));
bookRoutes.patch('/return', HttpAdapter(MakeReturnBookController()));
bookRoutes.delete('/delete', HttpAdapter(MakeDeleteBookController()));

export default bookRoutes;
