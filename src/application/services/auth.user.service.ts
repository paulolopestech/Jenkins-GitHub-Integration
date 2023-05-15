import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

import { error, success } from '../../shared/either';
import { AuthUserResponse } from '../../shared/types/response.types';
import { UserAuth } from '../../shared/types/user.types';
import ErrorTypes from '../../shared/error/error.types';
import ApplicationError from '../../shared/error/application.error';
import AuthUserUseCase from '../ports/usecases/auth.user.usecase';

import UserRepository from '../ports/resources/user.repository';
import { ValidateAuthUser } from '../../shared/validation/services/user.validators';
import Constants from '../../shared/constants';


@injectable()
export default class AuthUserService implements AuthUserUseCase {

    constructor(
        @inject('UserRepository')
        private userRepository: UserRepository,
    ) { }

    async handle(userData: UserAuth): Promise<AuthUserResponse> {
        const validate: any = ValidateAuthUser.validate(userData);

        if(validate[0]?.message) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, validate[0].message));
        }

        const {password, email} = userData;

        const result = await this.userRepository.getUserByEmail(email);

        if (result.isError()) {
            return error(result.value);
        }

        const user = result.value;

        if (!bcrypt.compareSync(password, user.password)) {
            return error(new ApplicationError(ErrorTypes.VALIDATION_ERROR, 'Wrong Password'));
        }

        const {id} = user;
        const token = Jwt.sign({id}, process.env.SECRET, {
            expiresIn: Constants.JWT_TOKEN_EXPIRATION,
        })

        const response = {
            auth: true,
            token,
        }
        return success(response);
    }
}