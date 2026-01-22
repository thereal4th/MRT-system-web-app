'use server';

import {createTurnstile, getAllTurnstiles, updateTurnstileData} from '@/lib/data/turnstile';
import { requireRoles } from '@/lib/authLayer';
import {TurnstileInput} from '@/lib/types';

//ACTION: create staff account
export async function registerTurnstileAction(formData: FormData){
    const newTurnstile = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        type: formData.get('type') as 'ENTRY' | 'EXIT',
        station: formData.get('station')  as 'north-ave'|'quezon-ave'|'cubao'|'santolan'|'pasig'|'shaw-boulevard'|'guadalupe'|'buendia'|'ayala'|'magallanes'| 'taft-ave'
    }

    if(!newTurnstile.type || !newTurnstile.station || !newTurnstile.username || !newTurnstile.password){
        return {success: false, error: "All fields required"};
    }

    try{
        await requireRoles(['ADMIN']);
        await createTurnstile(newTurnstile);
        return{success: true};
    }
    catch(e){
        console.log("Turnstile registration error: ", e);
        return {success: false, error: "Failed to create turnstile account."};
    }
}

export async function getAllTurnstileAction(){
    try{
        //require admin or staff roles
        await requireRoles(['ADMIN', 'STAFF']);
        const turnstileList = await getAllTurnstiles();
        return {success: true, data: turnstileList}
    }
    catch(e){
        console.log("Could not retrieve turnstile database: ",e);
        return{success: false, error: "Failed to retrieve turnstile database."}
    }
}

export async function updateTurnstileDataAction(_id: string, formData: FormData){
    try{
        await requireRoles(['ADMIN']);
        const data = Object.fromEntries(formData) as unknown as Partial<TurnstileInput>;
        const updatedTurnstile = await updateTurnstileData(_id, data);

        return {success: true, newStaffData: updatedTurnstile};
    }
    catch(e){
        console.log("Failed to update turnstile data: ", e);
        return{success: false, error: `Failed to update turnstile data ${e}`};
    }
}