import { CreateUserResponse } from '../../../shared/types/response.types';
import { User } from '../../../shared/types/user.types';

export default interface CreateUserUsecase {
  handle(user: User): Promise<CreateUserResponse>;
}
