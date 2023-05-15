/* eslint-disable import/prefer-default-export */
import Schema from 'validate';

export const ValidateCreateUser = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const ValidateAuthUser = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});