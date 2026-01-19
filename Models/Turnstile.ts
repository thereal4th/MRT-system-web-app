//not an actual user, only exists to access scanner page to serve kiosks and scan QRs
import User, {UserDocument} from './User';
import mongoose, {Schema} from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TurnstileDocument extends UserDocument{};

const TurnstileSchema = new Schema<TurnstileDocument>({
    //dont need to add anything here    
})
//check first if turnstile models already exists, then automatically add role: TURNSTILE when document is created
const Turnstile = mongoose.models.TURNSTILE || User.discriminator('TURNSTILE', TurnstileSchema);

export default Turnstile;