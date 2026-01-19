//contains operations and logic that will be imported into server actions and api routes (for stations)
//api routes for operations used by the mobile app

import {connectDB} from '@/lib/db';
import Station from '@/Models/Station';

//import input type
import {StationInput} from '@/lib/types'

//import into server actions and api routes
export async function getAllStations(){
    try{
        await connectDB();
        
        const stations = await Station.find({}).sort({orderIndex: 1}).lean(); //extract station stationuments sorted by property orderIndex

        return stations.map((station)=> ({
            /*id: station._id.toString(),
            name: station.name,
            slug: station.slug,
            status: station.status,
            crowdLevel: station.crowdLevel,
            orderIndex: station.orderIndex,
            distFromStartKm: station.distFromStartKm*/

            //or just use spread operator since we're taking all properties from station station anyway
            ...station,
            _id: station._id.toString(), //convert to string since _id is a reference
        }));
    }
    catch(error){
        console.log("Could not retrieve stations: ", error);
        return []; //return empty array to avoid errors
    }
}

//server actions only
export async function createStation(data: StationInput){
    try{
        await connectDB();

        const newStation = await Station.create(data);

        return{
            ...newStation.toObject(), //convert from complex mongoose doc to typescript object
            _id: newStation._id.toString()
        };
    }
    catch(error){
        console.log("failed to create new station: ", error);
        throw error; //throw to let server action know there's an error
    }
}

//server actions only
export async function updateStationData(_id: string, data: Partial<StationInput>){ //data represents fields to be updated
    try{
        await connectDB();

        const updatedStation = await Station.findByIdAndUpdate(
            _id,
            data,
            {new: true} //return updated doc
        ).lean();

        if(!updatedStation) return null; //in case station isn't in DB (nonexistent ID)

        return{
            ...updatedStation,
            _id: updatedStation._id.toString()
        };
    }
    catch(error){
        console.log("Failed to update station: ", error);
        throw error;
    }
}