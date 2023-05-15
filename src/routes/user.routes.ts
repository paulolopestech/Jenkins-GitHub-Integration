import { Router } from 'express';
import HttpAdapter from '../adapters/infrastructure/http.adapter';
import MakeAuthUserController from '../factories/auth.user.factory';
import MakeCreateUserController from '../factories/create.user.factory';

const userRoutes = Router();

userRoutes.post('/create', HttpAdapter(MakeCreateUserController()));
userRoutes.post('/auth', HttpAdapter(MakeAuthUserController()));

export default userRoutes;
