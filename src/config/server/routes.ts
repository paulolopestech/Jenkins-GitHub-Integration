import { Express } from 'express';
import bookRoutes from '../../routes/book.routes';
import userRoutes from '../../routes/user.routes';

export default (server: Express): void => {
  server.use('/user', userRoutes);
  server.use('/book', bookRoutes);
};
