//not an actual user, only exists to access scanner page to serve kiosks and scan QRs
import User, {UserDocument} from './User';
import mongoose, {Schema} from 'mongoose';

export interface TurnstileDocument extends UserDocument{
    type: 'ENTRY' | 'EXIST';
    station: string;
};

const TurnstileSchema = new Schema<TurnstileDocument>({
    type: {type: String, required: true, enum: ['ENTRY', 'EXIT']},
    station: {type: String, required: true, enum: ['north-ave', 'quezon-ave','cubao', 'santolan', 'pasig', 'shaw-boulevard', 'guadalupe', 'buendia', 'ayala', 'magallanes', 'taft-ave']}
})
//check first if turnstile models already exists, then automatically add role: TURNSTILE when document is created
const Turnstile = mongoose.models.TURNSTILE || User.discriminator('TURNSTILE', TurnstileSchema);

export default Turnstile;