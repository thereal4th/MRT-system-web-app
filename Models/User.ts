import {Schema, model, models, Document} from 'mongoose';

const options = {discriminatorKey: 'role', collection: 'users'}

export interface UserDocument extends Document{
    name?: string; //turnstiles and admin don't have names
    username: string; //passengers will input their email here
    password: string;
    createdAt: Date;
    role: 'ADMIN' | 'PASSENGER' | 'STAFF' | 'TURNSTILE'
}

const UserSchema = new Schema<UserDocument>({
    // SHARED FIELDS (Everyone has these)
    name: {type: String, required: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
}, options);

UserSchema.index({role: 1}); 

const User = models.User || model<UserDocument>('User', UserSchema);

export default User;





