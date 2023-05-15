import { CreateUserResponse, GetUserResponse } from '../../../shared/types/response.types';
import { UserDB } from '../../../shared/types/user.types';

export default interface UserRepository {
  createUser(user: UserDB): Promise<CreateUserResponse>;
  getUserByEmail(email: string): Promise<GetUserResponse>;
}
