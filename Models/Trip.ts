import mongoose, {Schema, Document, model, models} from 'mongoose';

export interface TripDocument extends Document{
    passenger: mongoose.Types.ObjectId; //link back to the passenger
    entryStation: string;
    exitStation?: string; //optional if they haven't exited yet
    fare: number;
    status: 'ONGOING' | 'COMPLETED' | 'FAILED'
    enteredAt: Date;
    exitedAt?: Date;
}

const TripSchema = new Schema<TripDocument>({
    passenger: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
    entryStation: {
        type: String,
        required: true,
        enum: ['north-ave', 'quezon-ave','cubao', 'santolan', 'pasig', 'shaw-boulevard', 'guadalupe', 'buendia', 'ayala', 'magallanes', 'taft-ave']
    },
    exitStation: {
        type: String,
        required: false,
        enum: ['north-ave', 'quezon-ave','cubao', 'santolan', 'pasig', 'shaw-boulevard', 'guadalupe', 'buendia', 'ayala', 'magallanes', 'taft-ave']
    },
    fare: {type: Number, default: 0},
    status: {type: String, enum: ['ONGOING', 'COMPLETED', 'FAILED'], default: 'ONGOING'}
})

const Trip = models.Trip || model<TripDocument>('Trip', TripSchema);

export default Trip;

