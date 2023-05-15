/* eslint-disable import/prefer-default-export */
import Jwt from "jsonwebtoken";
import { JwtValidatorResponse } from "../types/response.types";
import ApplicationError from "../error/application.error";
import { error, success } from "../either";
import ErrorTypes from "../error/error.types";

export class JwtValidator {
    validate(token: string): JwtValidatorResponse {
        if (!token) {
            const authError = new ApplicationError(ErrorTypes.AUTHENTICATION_ERROR, 'No token provided.');
            return error(authError);
        }

        try {
            Jwt.verify(token, process.env.SECRET);
        } catch (err) {
            const authError = new ApplicationError(ErrorTypes.AUTHENTICATION_ERROR, 'Invalid token.');
            return error(authError);
        }

        return success({ validation: true });
    }
}