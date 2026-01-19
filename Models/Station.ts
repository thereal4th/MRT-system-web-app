import {Schema, model, models, Document} from 'mongoose';

export interface StationDocument extends Document {
    name: string; //full name: "North Avenue"
    slug: string; //enum matching and URLs: "north-ave"
    status?: 'OPEN' | 'CLOSED' | 'MAINTENANCE';
    crowdLevel?: 'LOW' | 'MODERATE' | 'HEAVY';
    orderIndex: number; //1 for north-ave, 11 for taft, important for sorting
    distFromStartKm: number;
}

const StationSchema = new Schema<StationDocument>({
    name: {type: String, required: true, unique: true, enum: ['North Avenue', 'Quezon Avenue','Cubao', 'Santolan', 'Pasig', 'Shaw Boulevard', 'Guadalupe', 'Buendia', 'Ayala', 'Magallanes', 'Taft Avenue']},
    slug: {type: String, required: true, unique: true, lowercase: true, enum: ['north-ave', 'quezon-ave','cubao', 'santolan', 'pasig', 'shaw-boulevard', 'guadalupe', 'buendia', 'ayala', 'magallanes', 'taft-ave']},
    status: { type: String, enum: ['OPEN', 'CLOSED', 'MAINTENANCE'], default: 'OPEN'},
    crowdLevel: { type: String, enum:['LOW', 'MODERATE', 'HEAVY'], default: 'LOW'},
    orderIndex: {type: Number, required: true},
    distFromStartKm: {type: Number, required: true}
})

const Station = models.Station || model<StationDocument>('Station', StationSchema);

export default Station;