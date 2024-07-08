import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectRoleProps = {
    width?: string;
    onSelectValue?: (value: string) => void;
    defaultValue?: string;
}

const SelectRole: React.FC<SelectRoleProps> = ({ width = 'w-[180px]', onSelectValue, defaultValue }) => {
    const handlerChangeValue = (value: string) => {
        if (onSelectValue)
            onSelectValue(value)
    }

    return (
        <Select onValueChange={handlerChangeValue}>
            <SelectTrigger className={`${width}`}>
                <SelectValue placeholder={defaultValue ? defaultValue : 'role'} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pm">Product Manager</SelectItem>
                <SelectItem value="dev">Developer</SelectItem>
                <SelectItem value="design">Design</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SelectRole;
