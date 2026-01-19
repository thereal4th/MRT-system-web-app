//typescript type definitions for next-auth

import {DefaultSession} from "next-auth";
import "next-auth/jwt"

declare module "next-auth"{
    interface User{
        role: string;
    }

    interface Session {
        user: {
            role: string;
            id: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        role: string;
    }
}