import React, { ChangeEvent } from 'react';
import uploadIcon from '../../assets/uploadIcon.png';

interface InputProps {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomUpload: React.FC<InputProps> = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    required,
}) => {
    return (
        <div className="flex relative m-5 w-full">
            <label htmlFor={name} className="text-gray-600 absolute -top-3 left-2 bg-white">
                {label}
            </label>
            <div className=" border border-gray-300 p-3 w-full rounded-md focus-within:border-blue-500 cursor-pointer">
                <input
                    type="file"
                    name={name}
                    id={name}
                    className="opacity-0 absolute top-0 left-0 h-full w-full cursor-pointer"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                <div className="absolute right-3 top-3">
                    <img
                        src={uploadIcon}
                        alt="Upload Icon"
                        className="h-6 w-6"
                        onClick={() => document.getElementById(name)?.click()}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomUpload;
