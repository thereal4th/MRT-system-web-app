'use client'

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LucideIcon} from 'lucide-react';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

export function SidebarItem({icon: Icon, label, href}: SidebarItemProps){
    const pathname = usePathname();

    //check if user is on the page
    const isActive = pathname === href;

    return(
        <Link 
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive?
                    `bg-blue-600 text-white shadow-sm`//active style
                    :`text-gray-700 hover:bg-gray-100 hover:text-gray-900` //inactive style
                }`
        }>
            <Icon className={`h-5 w-5 ${isActive? `text-white`:`text-gray-500`}`}/>{label}
        </Link>
    )
}