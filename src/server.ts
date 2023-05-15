import 'reflect-metadata';
import './shared/container';

import httpServer from './config/server/httpServer';
import MongoHelper from './adapters/infrastructure/mongo/mongo.helper';

import 'dotenv/config';

new MongoHelper()
  .connect()
  .then(async () => {
    httpServer.listen(process.env.PORT || 3001, () => {
      // eslint-disable-next-line no-console
      console.log(`Book Loan App running on port ${process.env.PORT}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
