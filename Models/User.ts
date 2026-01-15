import mongoose, {Schema, Model} from 'mongoose';

export interface UserDocument extends Document{
    name: string;
    email?: string;
    password: string;
    role: 'ADMIN' | 'PASSENGER' | 'STAFF' | 'TURNSTILE'

}

