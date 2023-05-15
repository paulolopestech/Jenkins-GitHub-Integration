import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,    
    },
    name: String,
    email: {
        type: String,
        unique: true,    
    },
    password: String,
});

const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;
