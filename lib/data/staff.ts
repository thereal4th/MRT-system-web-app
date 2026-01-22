//contains operations and logic that will be imported into server actions and api routes (for turnstiles)
//api routes for operations used by the mobile app

import {connectDB} from '@/lib/db';
import Staff from '@/Models/Staff';
import bcrypt from 'bcryptjs'

//import input type
import {StaffInput} from '@/lib/types'

//import into server actions
export async function getAllStaff(){
    try{
        await connectDB();
        
        const staff = await Staff.find({}).sort({name: 1}).lean(); //extract staff documents and sort by name alphabetically

        return staff.map((staff)=> ({
            ...staff,
            _id: staff._id.toString(), //convert to string since _id is a reference
        }));
    }
    catch(error){
        console.log("Could not retrieve staff: ", error);
        return []; //return empty array to avoid errors
    }
}

//server actions only
export async function createStaff(data: StaffInput){
    try{
        await connectDB();

        //check if user exists
        const existingUser = await Staff.findOne({username: data.username});
        if (existingUser){
            throw new Error("Username already exists"); //throw server error for api route/server action to catch
        }

        const newStaff = await Staff.create({
            ...data,
            password: await bcrypt.hash(data.password, 10),
            //role automatically generated on creation using discriminator() method in Models/User.ts and Models/Staff.ts
        });
        
        return{
            ...newStaff.toObject(), //convert from complex mongoose doc to typescript object
            _id: newStaff._id.toString()
        };
    }
    catch(error){
        console.log("failed to create new staff: ", error);
        throw error; //throw to let server action know there's an error
    }
}

//server actions only
export async function updateStaffData(_id: string, data: Partial<StaffInput>){ //data represents fields to be updated
    try{
        await connectDB();

        //if data.password is being changed, hash it before saving to DB
        if(data.password){
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedStaff = await Staff.findByIdAndUpdate(
            _id,
            data,
            {new: true} //return updated doc
        ).lean();

        if(!updatedStaff) return null; //in case staff isn't in DB (nonexistent ID)

        return{
            ...updatedStaff,
            _id: updatedStaff._id.toString()
        };
    }
    catch(error){
        console.log("Failed to update staff: ", error);
        throw error;
    }
}

