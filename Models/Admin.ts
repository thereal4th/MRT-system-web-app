import User, {UserDocument} from './User';
import mongoose, {Schema} from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AdminDocument extends UserDocument {}

const AdminSchema = new Schema<AdminDocument>({});

//check first if admin models already exists, then automatically add role: ADMIN when document is created
const Admin = mongoose.models.ADMIN || User.discriminator<AdminDocument>('ADMIN', AdminSchema);

export default Admin;

