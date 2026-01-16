import User, {UserDocument} from './User';
import mongoose, {Schema} from 'mongoose';
 
export interface PassengerDocument extends UserDocument{
    balance: number;
    trips: mongoose.Types.ObjectId[];
}

const PassengerSchema = new Schema<PassengerDocument>({
    balance: {type: Number, required: true, default: 0.00},
    trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}], //ref Trip must match a Trip.ts schema file
})

const Passenger = mongoose.models.PASSENGER || User.discriminator('PASSENGER', PassengerSchema);

export default Passenger;