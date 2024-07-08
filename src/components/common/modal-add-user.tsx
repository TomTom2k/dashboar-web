import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import SelectRole from './select-role';
import { useUser } from '@/contexts/user-context';
interface ModalAddUser {
    type: 'create' | 'update';
    onClose: () => void;
}

const ModalAddUser = ({ type, onClose }: ModalAddUser) => {
    const { userDetail, handlerAddUser, handlerUpdateUser } = useUser()
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');

    useEffect(() => {
        if (type === 'update' && userDetail) {

            setImagePreview(userDetail.profilePic || '');
            setSelectedRole(userDetail.role || '');
            setValue('email', userDetail.email);
            setValue('role', userDetail.role);
            setValue('phoneNumber', userDetail.phoneNumber);
            setValue('firstName', userDetail.firstName);
            setValue('lastName', userDetail.lastName);
        } else {
            setImagePreview('');
            setSelectedRole('');
            reset()
        }
    }, [userDetail, type, setValue, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = (data: any) => {
        const dataUpload = { ...data, profilePic: imagePreview }
        delete dataUpload.passwordConfirmation
        if (type === "create")
            handlerAddUser(dataUpload)
        else
            handlerUpdateUser(dataUpload)
        onClose()
    };

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    return (
        <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
                {type === "create"
                    ? <DialogTitle>Add New User</DialogTitle>
                    : <DialogTitle>Detail User</DialogTitle>
                }
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-end items-center flex-col sm:flex-row'>
                    <div className="flex-1 flex-col pr-5 border-r">
                        <p className='mb-4'>User detail</p>
                        <div className="flex gap-4 mt-4">
                            <div className="flex-1">
                                <p>Email *</p>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <Input type='email' placeholder={'email@gmail.com'} {...field} />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="flex-1">
                                <p>Role *</p>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <SelectRole
                                            width='w-full'
                                            onSelectValue={(value) => {
                                                field.onChange(value);
                                                handleRoleChange(value);
                                            }}
                                            defaultValue={userDetail?.role || selectedRole}
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.role && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="flex-1">
                                <p>Phone Number *</p>
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <Input type='tel' placeholder={'0911223344'} {...field} />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.phoneNumber && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="flex-1">
                                <p>First Name *</p>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <Input placeholder={'David'} {...field} />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.firstName && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="flex-1">
                                <p>Last Name *</p>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <Input placeholder={'Tom'} {...field} />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.lastName && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="flex-1">
                                <p>Password *</p>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <Input type='password' {...field} />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.password && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="flex-1">
                                <p>Password Confirmation *</p>
                                <Controller
                                    control={control}
                                    name="passwordConfirmation"
                                    render={({ field }) => (
                                        <Input type='password' {...field} />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.passwordConfirmation && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex-initial w-60 px-10 flex flex-col items-center mt-4 sm:mt-0">
                        <p className='mb-4'>Profile Picture</p>
                        <div className='w-full aspect-square rounded-md overflow-hidden'>
                            {imagePreview
                                ? <img className='w-full h-full' src={imagePreview} alt="Preview" />
                                : <Image className='w-full h-full text-slate-500' />
                            }
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ visibility: 'hidden', position: 'absolute', width: '1px', height: '1px' }}
                            id="imageUpload"
                        />
                        <label htmlFor="imageUpload" className='mt-2'>
                            <Button type="button" onClick={handleSelectImage}>Select Image</Button>
                        </label>
                    </div>
                </div>
                <DialogFooter>
                    <div className='flex justify-start w-full gap-5 mb-10 mt-5'>
                        <Button type="submit">
                            {type === "create"
                                ? "Add User" : 'Update User'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    </div>
                </DialogFooter>
            </form>
        </DialogContent >
    );
};

export default ModalAddUser;
