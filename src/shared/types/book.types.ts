/* eslint-disable @typescript-eslint/no-explicit-any */
export type Book = {
    name: string,
    ownerName: string,
    ownerId: string,
    imageUrl: string,
};

export type BookDB = {
    id: string,
    name: string,
    ownerName: string,
    ownerId: string,
    userLendId: string,
    lend: boolean,
    imageUrl: string,
};
  