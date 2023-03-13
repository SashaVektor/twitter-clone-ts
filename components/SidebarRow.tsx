import React, { SVGProps } from 'react'

interface Props {
    icon: JSX.Element
    title: string
    onClick?: () => {}
}

const SidebarRow = ({ icon, title, onClick }: Props) => {
    return (
        <div className='flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full 
        hover:bg-gray-100 cursor-pointer transition duration-200 group'
        onClick={() => onClick?.()}>
            {icon}
            <p className='group-hover:text-twitter hidden md:inline-flex text-base lg:text-xl'>
                {title}
            </p>
        </div>
    )
}

export default SidebarRow
