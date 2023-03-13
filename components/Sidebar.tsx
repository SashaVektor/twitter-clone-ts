import React from 'react'
import {
    BellIcon, HashtagIcon, BookmarkIcon,
    UserIcon, HomeIcon, EnvelopeIcon,
    ListBulletIcon, EllipsisHorizontalCircleIcon
} from "@heroicons/react/24/outline"
import SidebarRow from './SidebarRow'
import { useSession, signIn, signOut } from "next-auth/react"

const links = [
    {
        icon: <HomeIcon className='h-6 w-6' />,
        title: "Home"
    },
    {
        icon: <HashtagIcon className='h-6 w-6' />,
        title: "Explore"
    },
    {
        icon: <BellIcon className='h-6 w-6' />,
        title: "Notifications"
    },
    {
        icon: <EnvelopeIcon className='h-6 w-6' />,
        title: "Messages"
    },
    {
        icon: <BookmarkIcon className='h-6 w-6' />,
        title: "Bookmarks"
    },
    {
        icon: <ListBulletIcon className='h-6 w-6' />,
        title: "Lists"
    },
    {
        icon: <EllipsisHorizontalCircleIcon className='h-6 w-6' />,
        title: "More"
    }
]

const Sidebar = () => {
    const { data: session } = useSession()
    return (
        <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
            <img src="https://links.papareact.com/drq" alt="twitter"
                className='m-3 h-10 w-10 object-contain'
            />
            {links.map((link) => (
                <SidebarRow key={link.title} icon={link.icon} title={link.title} />
            ))}
            <SidebarRow icon={<UserIcon className='h-6 w-6' />}
                title={session ? "Sign Out" : "Sign In"}
                onClick={!session ? signIn : signOut} />
        </div>
    )
}

export default Sidebar
