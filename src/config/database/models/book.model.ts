import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema({
    id: {
        type: String,
        unique: true,    
    },
    name: String,
    ownerName: String,
    ownerId: String,
    userLendId: String,
    lend: Boolean,
    imageUrl: String,
});

const BookModel = mongoose.model('BookModel', BookSchema);

export default BookModel;
