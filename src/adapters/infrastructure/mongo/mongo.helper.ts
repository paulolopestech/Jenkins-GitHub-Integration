import { connect } from 'mongoose';

import 'dotenv/config';

export default class MongoHelper {
  async connect(): Promise<void> {
    try {
      await connect(
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR_MONGO_CONNECTION', e);
    }
  }
}
