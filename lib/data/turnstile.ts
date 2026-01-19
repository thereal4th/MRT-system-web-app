//contains operations and logic that will be imported into server actions and api routes (for turnstiles)
//api routes for operations used by the mobile app

import {connectDB} from '@/lib/db';
import Turnstile from '@/Models/Turnstile';
import bcrypt from 'bcryptjs'

//import input type
import {TurnstileInput} from '@/lib/types'

//import into server actions
export async function getAllTurnstiles(){
    try{
        await connectDB();
        
        const turnstiles = await Turnstile.find({}).sort({station: 1}).lean(); //extract turnstile documents and sort by station alphabetically

        return turnstiles.map((turnstile)=> ({
            ...turnstile,
            _id: turnstile._id.toString(), //convert to string since _id is a reference
        }));
    }
    catch(error){
        console.log("Could not retrieve turnstiles: ", error);
        return []; //return empty array to avoid errors
    }
}

//server actions only
export async function createTurnstile(data: TurnstileInput){
    try{
        await connectDB();

        const newturnstile = await Turnstile.create({
            ...data,
            password: await bcrypt.hash(data.password, 10),
            //role automatically generated on creation using discriminator() method in Models/User.ts and Models/Turnstile.ts
        });
        

        return{
            ...newturnstile.toObject(), //convert from complex mongoose doc to typescript object
            _id: newturnstile._id.toString()
        };
    }
    catch(error){
        console.log("failed to create new turnstile: ", error);
        throw error; //throw to let server action know there's an error
    }
}

//server actions only
export async function updateTurnstileData(_id: string, data: Partial<TurnstileInput>){ //data represents fields to be updated
    try{
        await connectDB();

        //if data.password is being changed, hash it before saving to DB
        if(data.password){
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedturnstile = await Turnstile.findByIdAndUpdate(
            _id,
            data,
            {new: true} //return updated doc
        ).lean();

        if(!updatedturnstile) return null; //in case turnstile isn't in DB (nonexistent ID)

        return{
            ...updatedturnstile,
            _id: updatedturnstile._id.toString()
        };
    }
    catch(error){
        console.log("Failed to update turnstile: ", error);
        throw error;
    }
}