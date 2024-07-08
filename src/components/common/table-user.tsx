import { User, useUser } from '@/contexts/user-context'
import React from 'react'
import {
    LoaderCircle,
    ArrowDownUp
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'

type TableUserProps = {
    data: User[];
    isLoading: boolean;
    onSort: (fieldname: keyof User) => void;
    onEdit: (user: User) => void
}

const TableUser = ({ data, isLoading, onSort, onEdit }: TableUserProps) => {
    const { handleDelete } = useUser()
    if (isLoading)
        return <div className='w-full flex justify-center'>
            <LoaderCircle className='animate-spin' />
        </div>

    return (
        <Table className='text-center'>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-center font-bold text-black'>#</TableHead>
                    <TableHead className='text-center font-bold text-black'>Email</TableHead>
                    <TableHead className='text-center font-bold text-black'>Phone Number</TableHead>
                    <TableHead className='text-center font-bold text-black' onClick={() => onSort("firstName")}>
                        <div className='flex items-center justify-center'><p>First Name</p> <ArrowDownUp className='ml-3 w-3 h-3 cursor-pointer' /></div>
                    </TableHead>
                    <TableHead className='text-center font-bold text-black' onClick={() => onSort("lastName")}>
                        <div className='flex items-center justify-center'><p>Last Name</p> <ArrowDownUp className='ml-3 w-3 h-3 cursor-pointer' /></div>
                    </TableHead>
                    <TableHead className='text-center font-bold text-black' onClick={() => onSort("role")}>
                        <div className='flex items-center justify-center'><p>Role</p> <ArrowDownUp className='ml-3 w-3 h-3 cursor-pointer' /></div>
                    </TableHead>
                    <TableHead className='text-center font-bold text-black'></TableHead>
                    <TableHead className='text-center font-bold text-black'></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user, index) =>
                    <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <Button variant="link" onClick={() => onEdit(user)}>Edit</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="link" onClick={() => handleDelete(user._id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TableUser