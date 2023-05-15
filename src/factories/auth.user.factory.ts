import { container } from 'tsyringe';
import AuthUserController from '../adapters/controllers/auth.user.controller';
import AuthUserService from '../application/services/auth.user.service';

const MakeAuthUserController = (): AuthUserController => {
  container.resolve(AuthUserService);
  return container.resolve(AuthUserController);
};

export default MakeAuthUserController;
