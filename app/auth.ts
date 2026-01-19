import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {authConfig} from './auth.config';
import UserModel from '@/Models/User';
import bcrypt from "bcryptjs";
import {connectDB} from '@/lib/db';

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,

    providers:[
        Credentials({
            name: "Credentials",
            credentials: {
                username:{label: "username", type: "text"},
                password:{label: "password", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.username || !credentials?.password) return null;

                await connectDB();

                const user = await UserModel.findOne({username: credentials.username as string});

                if (!user) return null;

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if(passwordMatch){
                    return{
                        id: user._id.toString(),
                        name: user.name,
                        role: user.role
                    };
                }
                return null;
            }
        })
    ],

    callbacks: {
        ...authConfig.callbacks,
        async session({session, token}){
            if(token.sub && session.user){
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },

        async jwt({token, user}){
            if(user){
                token.sub = user.id;
                token.role = user.role;
            }
            return token;
        }
    },

    session: {strategy: "jwt"}
});

