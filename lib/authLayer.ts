//auth checks to import into server actions/api routes

import {auth} from '@/app/auth';
import {UserRoles} from '@/lib/types';

//function to check an existing session and login
export async function requireAuth(){
    const session = await auth();

    //check if session exists or it has a user
    if(!session || !session.user){
        throw new Error("USER IS NOT AUTHENTICATED");
    }
    return session;
}
 
export async function requireRoles(allowedRoles: UserRoles[]){

    const session = await requireAuth() //call above function to check session

    //check if current session's user's role exists inside allowedRoles array.
    if(allowedRoles.includes(session.user.role as UserRoles)) return session

    throw new Error(`UNAUTHORIZED ACCESS: ${allowedRoles} ONLY`)

}

