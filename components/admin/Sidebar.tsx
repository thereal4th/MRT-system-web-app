'use client';
import {LayoutDashboard, TrainFront, UserStar, LogOut, User} from 'lucide-react';
import {SidebarItem} from '@/components/admin/sidebar-item';

export default function Sidebar(){
    return(
        <aside className="min-w-55 bg-white">

            {/*Logo*/}
            <div className="h-16 flex items-center px-6 border-b border-gray-300 ">
                <div className="flex items-center gap-2 font-bold text-xl text-blue-900">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        M
                    </div>
                    MRT-3 Admin
                </div>
            </div>

            {/*NAV section */}
            <div className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-2">
                    Overview
                </div>
                <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin/dashboard"/>
                <SidebarItem icon={TrainFront} label="Stations QR" href="/admin/stations"/>
                <SidebarItem icon={TrainFront} label="Stations Database" href="/admin/stations/station_database"/>
                <SidebarItem icon={User} label="Passenger Database" href="/admin/passenger_database"/>
                <SidebarItem icon={UserStar} label="Staff Database" href="/admin/staff_database"/>
            </div>

            {/*Footer */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray border border-gray-100">
                    AD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                    <p className="text-xs text-gray-500 truncate">admin@mrt.com</p>
                </div>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <LogOut className="h-4 w-4"/>
                </button>
            </div>
        </aside>
    )
}