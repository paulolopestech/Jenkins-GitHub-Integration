import 'dotenv/config';
import { CreateUserResponse, GetUserResponse } from '../../../shared/types/response.types';
import { error, success } from '../../../shared/either';
import ErrorTypes from '../../../shared/error/error.types';
import ApplicationError from '../../../shared/error/application.error';
import UserRepository from '../../../application/ports/resources/user.repository';
import { UserDB } from '../../../shared/types/user.types';
import UserModel from '../../../config/database/models/user.model';

export default class UserMongoAdapter implements UserRepository {
  async createUser(user: UserDB): Promise<CreateUserResponse> {
    try {
      const userModel = new UserModel(user);
      const { email, name } = await userModel.save();
      const response = { email, name };
      return success(response);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }

  async getUserByEmail(email: string): Promise<GetUserResponse> {
    try {
      const user: UserDB = await UserModel.findOne({ email: email });
      if (!user) {
        return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, 'USER NOT FOUND'));
      }
      return success(user);
    } catch (e) {
      return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, e.toString()));
    }
  }
}
