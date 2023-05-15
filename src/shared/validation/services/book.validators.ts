/* eslint-disable import/prefer-default-export */
import Schema from 'validate';

export const ValidateCreateBook = new Schema({
    name: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

export const ValidateBorrowBook = new Schema({
    bookId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

export const ValidateDeleteBook = new Schema({
    bookId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
});

export const ValidateReturnBook = new Schema({
    bookId: {
        type: String,
        required: true,
    },
});