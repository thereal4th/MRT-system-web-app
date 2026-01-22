'use server';

import {createStaff, getAllStaff, updateStaffData} from '@/lib/data/staff';
import { requireRoles } from '@/lib/authLayer';
import {StaffInput} from '@/lib/types';

//ACTION: create staff account
export async function registerStaffAction(formData: FormData){
    const newStaff = {
        name: formData.get('name') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string
    }

    if(!newStaff.name || !newStaff.username || !newStaff.password){
        return {success: false, error: "All fields required"};
    }

    try{
        await requireRoles(['ADMIN']);
        await createStaff(newStaff);
        return{success: true};
    }
    catch(e){
        console.log("Staff registration error: ", e);
        return {success: false, error: "Failed to create staff account."};
    }
}

export async function getAllStaffAction(){
    try{
        //require admin or staff roles
        await requireRoles(['ADMIN', 'STAFF']);
        const staffList = await getAllStaff();
        return {success: true, data: staffList}
    }
    catch(e){
        console.log("Could not retrieve staff database: ",e);
        return{success: false, error: "Failed to retrieve staff database."}
    }
}

export async function updateStaffDataAction(_id: string, formData: FormData){
    try{
        //DO NOT USE Object.fromEntries FOR MIXED TYPES IN newStaff
        await requireRoles(['ADMIN']);
        const data = Object.fromEntries(formData) as unknown as Partial<StaffInput>;
        const updatedStaff = await updateStaffData(_id, data);

        return {success: true, newStaffData: updatedStaff};
    }
    catch(e){
        console.log("Failed to update staff data: ", e);
        return{success: false, error: `Failed to update staff data ${e}`};
    }
}