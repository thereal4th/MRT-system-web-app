//auth rules imported by middleware.ts and auth.ts

import type {NextAuthConfig} from 'next-auth'; //NextAuthConfig in v5

export const authConfig = {
    pages: {
        signIn: "/login",
    },

    callbacks: {
        //authorized function reads the decrypted JWT to check roles
        authorized({auth, request: {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const userRole = (auth?.user as {role?: string})?.role; //extract user role

            const isAdminRoute = nextUrl.pathname.startsWith("/admin");
            const isTurnstileRoute = nextUrl.pathname.startsWith("/turnstile");
            const isLogInRoute = nextUrl.pathname.startsWith("/login");

            if (isAdminRoute){
                if(isLoggedIn && userRole === 'ADMIN') return true;
                return false; //redirects to login on false
            }

            if (isTurnstileRoute){
                if(isLoggedIn && userRole === 'TURNSTILE') return true;
                return false; //redirects to login on false
            }

            if(isLogInRoute && isLoggedIn){
                if(userRole==="ADMIN"){
                    return Response.redirect(new URL('/admin/dashboard', nextUrl));
                }
                if(userRole==="TURNSTILE"){
                    return Response.redirect(new URL('/turnstile', nextUrl));
                }
                //if neither, send to app/page.tsx
                return Response.redirect(new URL('/', nextUrl));
            }
            return true; //return true for non-protected routes
        },
    },
    providers: [],
} satisfies NextAuthConfig;
