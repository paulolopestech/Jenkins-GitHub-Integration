import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { error, success } from '../../shared/either';
import { CreateUserResponse } from '../../shared/types/response.types';
import { User } from '../../shared/types/user.types';
import CreateUserUsecase from '../ports/usecases/create.user.usecase';
import {ValidateCreateUser} from '../../shared/validation/services/user.validators';
import ApplicationError from '../../shared/error/application.error';

import UserRepository from '../ports/resources/user.repository';

import ErrorTypes from '../../shared/error/error.types';

@injectable()
export default class CreateUserService implements CreateUserUsecase {

    constructor(
        @inject('UserRepository')
        private userRepository: UserRepository,
    ){}

    async handle(userData: User): Promise<CreateUserResponse> {
        const validate: any = ValidateCreateUser.validate(userData);
        
        if(validate[0]?.message) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, validate[0].message));
        }

        const id = uuidv4();

        const {password} = userData;
        const hashPassword = bcrypt.hashSync(password, 10);

        const modUserData = {
            ...userData,
        }

        modUserData.password = hashPassword;

        const user = {...modUserData, id};

        const createUserResponse: CreateUserResponse = await this.userRepository.createUser(user);

        if(createUserResponse.isError())
            return error(createUserResponse.value);

        return success(createUserResponse.value);
    }
}