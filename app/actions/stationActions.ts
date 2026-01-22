'use server';

import {createStation, getAllStations, updateStationData} from '@/lib/data/station';
import { requireRoles } from '@/lib/authLayer';
import {StationInput} from '@/lib/types';
import {revalidatePath} from 'next/cache';

//ACTION: create staff account
export async function registerStationAction(formData: FormData){
    const newStation = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        status: formData.get('status') as 'OPEN' | 'CLOSED' | 'MAINTENANCE',
        crowdLevel: formData.get('crowdlevel') as 'LOW' | 'MODERATE' | 'HEAVY',
        orderIndex: Number(formData.get('orderindex')),
        distFromStartKm: Number(formData.get('distfromstartkm'))

    }

    //Number() converts empty strings into 0, which is dangerous
    //so check if rawindex is empty first, return error if true
    const rawIndex = formData.get('orderindex');
    if(rawIndex === null || rawIndex === ''){
        return{success: false, error: "orderIndex cannot be empty."};
    }

    //same for distFromStartKm
    const rawDist = formData.get('distfromstartkm');
    if(rawDist === null || rawDist === ''){
        return{success: false, error: "distFromStartKm cannot be empty."};
    }

    //use IsNaN to check if Number() returns NaN (happens when invalid strings with letters are converted)
    if(!newStation.name || !newStation.slug || !newStation.status || !newStation.crowdLevel || isNaN(newStation.orderIndex)){
        return {success: false, error: "All fields required"};
    }

    try{
        await requireRoles(['ADMIN']);
        await createStation(newStation);

        //tell server to fetch new data from DB instead of outdated cache to display new data
        revalidatePath('/admin/stations/stations_database');
        return{success: true};
    }
    catch(e){
        console.log("Station registration error: ", e);
        return {success: false, error: "Failed to create station account."};
    }
}

export async function getAllStationsAction(){
    try{                                                                                                     
        //require admin or staff roles
        await requireRoles(['ADMIN', 'STAFF']);
        const stationList = await getAllStations();
        return {success: true, data: stationList}
    }
    catch(e){
        console.log("Could not retrieve station database: ",e);
        return{success: false, error: "Failed to retrieve station database."}
    }
}

export async function updateStationDataAction(_id: string, formData: FormData){
    try{
        //fix: do not use Object.fromEntries because it may convert number fields to strings
        await requireRoles(['ADMIN']);

        const data: Partial<StationInput> = {}

        if (formData.get('name')) data.name = formData.get('name') as string;
        if (formData.get('slug')) data.slug = formData.get('slug') as string;
        if (formData.get('status')) data.status = formData.get('status') as 'OPEN' | 'CLOSED' | 'MAINTENANCE';
        if (formData.get('crowdlevel')) data.crowdLevel = formData.get('crowdlevel') as 'LOW' | 'MODERATE' | 'HEAVY';

        //parse numbers only if they exist
        const rawIndex = formData.get('orderindex');
        if (rawIndex && rawIndex !== '') data.orderIndex = Number(rawIndex);

        const rawDist = formData.get('distfromstartkm');
        if (rawDist && rawDist !== '') data.distFromStartKm = Number(rawDist);

        const updatedStation = await updateStationData(_id, data);

        //tell server to fetch new data from DB instead of outdated cache to display new data
        revalidatePath('/admin/stations/stations_database');

        return {success: true, newStaffData: updatedStation};
    }
    catch(e){
        console.log("Failed to update station data: ", e);
        return{success: false, error: `Failed to update station data ${e}`};
    }
}