//login for staff and admins only

'use client';

import {useActionState} from 'react';
import Link from 'next/link';
//TODO: import {authenticate} from '@/app/auth';
import {Button} from '@/components/Button';
import {CalendarCheck, LogIn,} from 'lucide-react';

export default function LoginPage(){
    //TODO: const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);
    
    return(
        <div className = "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                <div className = "text-center">
                    <div className = "inline-flex items-center justify-center bg-white p-2 rounded-2xl mb-4 border-3 border-blue-600">
                        <CalendarCheck className="h-8 w-8 text-blue-600 bg-white"/>
                    </div>
                    <h2 className="text-3xl font-extrabold text-blue-600">Welcome</h2>
                    <p className="mt-2 text-sm text-gra-600">Enter your details to access system dashboard</p>
                </div>

                <div className ="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    {/*
                    TODO: after authActions and app/signup setup
                    {showSuccess && !errorMessage && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            Account created successfully! Please log in.
                        </div>
                    )}
                    
                    {errorMessage && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errorMessage}
                        </div>
                    )}
                    */
                    }

                    {/*TODO: action={dispatch}*/}
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                required
                                autoComplete="username" //for password managers
                                placeholder="john123"
                                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••••"
                                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        
                        {/*TODO: add disabled={isPending} attribute */}
                        <Button
                        type="submit"
                        className="w-full py-3 text-lg bg-slate-900 text-white hover:bg-slate-800"
                        >   
                            {/*temporary snippet below*/}

                            <span className="flex items-center gap-2">
                                <LogIn className="h-5 w-5" />
                                Log In
                            </span>
                            {/*
                            
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                                    Logging in...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogIn className="h-5 w-5" />
                                    Log In
                                </span>
                            )}
                            */}
                        </Button>
                    </form>

                    {/* removed signup

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">New User? </span>
                        <Link href="/signup" className="font-semibold text-black hover:underline">
                            Create an account
                        </Link>
                    </div>
                    
                    */}


                    <p className="text-center text-xs text-gray-400 mt-8">&copy; 2026 4th MRT System. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

