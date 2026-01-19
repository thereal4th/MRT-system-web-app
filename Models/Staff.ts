import User, {UserDocument} from './User';
import mongoose, {Schema} from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StaffDocument extends UserDocument{}

const StaffSchema = new Schema<StaffDocument>({});

//check first if staff models already exists, then automatically add role: STAFF when document is created
const Staff = mongoose.models.STAFF || User.discriminator<StaffDocument>('STAFF', StaffSchema);

export default Staff;