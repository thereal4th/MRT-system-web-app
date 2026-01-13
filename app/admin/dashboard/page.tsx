'use client'

import Sidebar from '@/components/admin/Sidebar' 
import { 
  Users, 
  ArrowUpRight,
  UserPlus,
  TrainFront
} from 'lucide-react'

export default function AdminDashboard(){

    // 1. replace with DB data later

    const stats = [
        { 
            label: "Total Passengers", 
            value: "12,450", 
            sub: "Entries today", 
            icon: Users, 
            color: "text-blue-600", 
            bg: "bg-blue-100" 
        },
        { 
            label: "Stations Open", 
            value: "13/13", 
            sub: "Normal Operations", 
            icon: TrainFront, 
            color: "text-emerald-600", 
            bg: "bg-emerald-100" 
        },

        { 
            label: "Admin & Staff", 
            value: "4", 
            sub: "Active Accounts", 
            icon: UserPlus, 
            color: "text-purple-600", 
            bg: "bg-purple-100" 
        },
    ];

    return(
        <div className="min-h-screen flex flex-row bg-slate-50 text-slate-900">
            
            <Sidebar/>

            <div className="flex-1 bg-gray-100 flex flex-col p-8 overflow-y-auto h-screen">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Admin.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-slate-500">
                                <span className="text-emerald-600 font-medium flex items-center gap-1">
                                    <ArrowUpRight className="h-3 w-3" />
                                    {stat.sub}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area*/}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT: Quick Actions (Instead of Fake Alerts) */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Action 1: Stations */}
                            <button className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Manage Staff</h4>
                                    <p className="text-xs text-slate-500">Create or delete staff accounts</p>
                                </div>
                            </button>

                            {/* Action 2: User Lookup */}
                            <button className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all text-left group">
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-200">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Passenger Lookup</h4>
                                    <p className="text-xs text-slate-500">Find user details by ID</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Simple Time/Date (Filler) */}
                    <div className="bg-linear-to-br from-green-600 to-blue-800 rounded-xl shadow-sm p-6 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="font-medium text-blue-100">System Time</h3>
                            <h2 className="text-3xl font-bold mt-2">
                                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </h2>
                            <p className="text-blue-200 text-sm">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-blue-500/30">
                            <p className="text-xs text-blue-200">
                                MRT-3 Admin Console<br/>
                                Version 1.0.0
                            </p>
                        </div>
                    </div>

                </div>
             </div>
        </div>
    )
}