/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
    name: string,
    password: string,
    email: string,
};

export type UserAuth = {
    email: string,
    password: string,
};

export type UserDB = {
    id: string,
    name: string,
    password: string,
    email: string,
};

export type UserCreateResponse = {
    name: string,
    email: string,
};
