//for type safety in document creation actions/endpoints

/*export interface UserRoles{
    role: 'ADMIN'|'STAFF'|'TURNSTILE'|'PASSENGER'
}*/

//for requireRole function in auth layer
export type UserRoles = 'ADMIN'|'STAFF'|'TURNSTILE'|'PASSENGER';

export interface StationInput{
    name: string; //full name: "North Avenue"
    slug: string; //enum matching and URLs: "north-ave"
    status?: 'OPEN' | 'CLOSED' | 'MAINTENANCE';
    crowdLevel?: 'LOW' | 'MODERATE' | 'HEAVY';
    orderIndex: number; //1 for north-ave, 11 for taft, important for sorting
    distFromStartKm: number;
}

export interface TurnstileInput{
    username: string;
    password: string;
    type: 'ENTRY' | 'EXIT';
    station: 'north-ave'|'quezon-ave'|'cubao'|'santolan'|'pasig'|'shaw-boulevard'|'guadalupe'|'buendia'|'ayala'|'magallanes'| 'taft-ave'
}

export interface StaffInput{
    name: string;
    username: string;
    password: string;
}