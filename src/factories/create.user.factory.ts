import { container } from 'tsyringe';
import CreateUserController from '../adapters/controllers/create.user.controller';
import CreateUserService from '../application/services/create.user.service';

const MakeCreateUserController = (): CreateUserController => {
  container.resolve(CreateUserService);
  return container.resolve(CreateUserController);
};

export default MakeCreateUserController;
