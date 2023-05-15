import { AuthUserResponse } from '../../../shared/types/response.types';
import { UserAuth } from '../../../shared/types/user.types';

export default interface AuthUserUseCase {
  handle(userData: UserAuth): Promise<AuthUserResponse>;
}
