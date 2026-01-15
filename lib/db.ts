import {MongoClient} from 'mongodb';
import mongoose from 'mongoose';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_CONNECTION_STRING;
const options = {};

export async function connectDB(){

    if (mongoose.connection.readyState >= 1) return;
    else{
        await clientPromise;
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!); 
    }
}

//CHECK IF CONNECTION STRING EXISTS
if(!process.env.MONGODB_CONNECTION_STRING){
    throw new Error("MONGO URL MISSING IN ENVIRONMENT VARIABLES");
}

if(process.env.NODE_ENV === 'development'){
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    }

    if(!globalWithMongo._mongoClientPromise){
        client = new MongoClient(uri!, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }

    clientPromise = globalWithMongo._mongoClientPromise;
}
else{
    client = new MongoClient(uri!, options);
    clientPromise = client.connect();
}

export default clientPromise;

