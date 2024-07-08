import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Header = () => {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-white px-4 m-0 w-full">
            <h1 className='text-2xl font-bold'>HRDept Company</h1>
            <nav className='flex items-center'>
                <div className='mr-6 flex flex-col justify-end'>
                    <p >Rene MCKelvey</p>
                    <span className='text-xs text-slate-500 text-end'>Product Manager</span>
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </nav>
        </header>
    )
}

export default Header