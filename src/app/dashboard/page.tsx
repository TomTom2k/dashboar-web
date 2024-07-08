"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ModalAddUser from '@/components/common/modal-add-user'
import SelectRole from '@/components/common/select-role'
import TableUser from '@/components/common/table-user'
import { User, useUser } from '@/contexts/user-context'

const Dashboard = () => {
    const { users, setUsers, isLoading, setUserDetail, handlerSearchUser } = useUser();
    const [usersData, setUsersData] = useState<User[]>([])
    const [usersShow, setUsersShow] = useState<User[]>([])
    const [modalDetailUser, setModalDetailUser] = useState(false)
    const [typeModal, setTypeModal] = useState<'create' | 'update'>('create')
    const [currentPage, setCurrentPage] = useState(0)
    const [sizeRow, setSizeRow] = useState(5)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [roleSelect, setRoleSelect] = useState<string>('');
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setUsersData(users)
    }, [users])

    useEffect(() => {
        if (usersData) {
            const start = currentPage * sizeRow;
            const end = start + sizeRow;
            const slicedUsers: User[] = usersData.slice(start, end);
            setUsersShow(slicedUsers);
        }
    }, [usersData, currentPage, sizeRow]);

    const numPage = useMemo(() => {
        return Math.ceil(usersData?.length ? usersData.length / sizeRow : 1);
    }, [usersData, sizeRow]);

    const handlerBtnExportExcel = () => {
        if (!usersData) return;

        const ws = XLSX.utils.json_to_sheet(usersData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "users.xlsx");
    }

    const handlerBtnNext = () => {
        if (currentPage === numPage) return
        setCurrentPage(currentPage + 1)
    }

    const handlerBtnPaginate = (value: number) => {
        setCurrentPage(value)
    }

    const handlerBtnPre = () => {
        if (currentPage === 0) return
        setCurrentPage(currentPage - 1)
    }

    const handlerSelectSizeRow = (value: any) => {
        setSizeRow(value)
    }

    const handlerSortTable = (fieldname: keyof User) => {
        const sortedUsers: User[] = [...usersData].sort((a: User, b: User) => {
            const fieldA = a[fieldname].toString().toLowerCase();
            const fieldB = b[fieldname].toString().toLowerCase();

            if (sortDirection === 'asc') {
                return fieldA > fieldB ? 1 : -1;
            } else {
                return fieldA < fieldB ? 1 : -1;
            }
        });

        setUsers(sortedUsers);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handlerBtnAddUser = () => {
        setModalDetailUser(true)
        setTypeModal('create')
    }

    const handlerBtnEditUser = (user: User) => {
        setUserDetail(user)
        setModalDetailUser(true)
        setTypeModal('update')
    }

    const handlerCloseModal = () => {
        setModalDetailUser(false)
    }

    const handlerSelectRole = (role: string) => {
        setRoleSelect(role)
    }

    const handlerBtnSearch = () => {
        const searchValue = searchRef.current ? searchRef.current.value : '';
        const result = handlerSearchUser(searchValue, roleSelect);
        setUsersData(result);
    }

    return (
        <Dialog open={modalDetailUser}>
            <div className='container rounded-lg flex-1 mt-4'>
                <div className='border h-full rounded-xl shadow pb-6'>
                    <div className="flex justify-between gap-4 p-4 row">
                        <h2 className='text-xl font-medium'>User</h2>
                        <div className='flex gap-4'>
                            <Button onClick={handlerBtnExportExcel}>
                                Export to Excel
                            </Button>
                            <DialogTrigger asChild onClick={handlerBtnAddUser}>
                                <Button>Add New User</Button>
                            </DialogTrigger>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row px-4 gap-4">
                        <div className="flex-grow sm:flex-grow-0">
                            <Input placeholder='Search User...' className="w-full sm:w-[280px]" ref={searchRef} />
                        </div>
                        <div className="mt-4 sm:mt-0 flex-grow sm:flex-grow-0">
                            <SelectRole onSelectValue={handlerSelectRole} width='w-full sm:w-[80px]' />
                        </div>
                        <div className="mt-4 sm:mt-0 flex-grow sm:flex-grow-0">
                            <Button onClick={handlerBtnSearch} className="w-full">
                                Search
                            </Button>
                        </div>
                    </div>

                    <div className='row mt-8'>
                        <TableUser data={usersShow} isLoading={isLoading} onSort={handlerSortTable} onEdit={handlerBtnEditUser} />
                    </div>
                    <div className="row justify-end mt-6 sm:mt-0">
                        <Pagination className='justify-end items-center flex-col sm:flex-row'>
                            <div className='flex items-center'>
                                <p className='mr-4'>Rows per page </p>

                                <Select onValueChange={handlerSelectSizeRow}>
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue placeholder={sizeRow} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="15">15</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <PaginationContent className='mt-4 sm:mt-0'>
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={handlerBtnPre} />
                                </PaginationItem>
                                {Array.from({ length: numPage }, (_, index) => (
                                    <PaginationItem key={index}>
                                        {index === currentPage
                                            ? <PaginationLink href="#" onClick={() => handlerBtnPaginate(index)} isActive>{index + 1}</PaginationLink>
                                            : <PaginationLink href="#" onClick={() => handlerBtnPaginate(index)}>{index + 1}</PaginationLink>}
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={handlerBtnNext} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                    </div>
                </div>
            </div>

            <ModalAddUser type={typeModal} onClose={handlerCloseModal} />
        </Dialog>
    )
}

export default Dashboard