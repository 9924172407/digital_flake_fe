import React, { ChangeEvent, useState } from 'react'
import eyeOff from '../../assets/eyeOff.png'
interface inputProps {
    label: string,
    name: string,
    placeholder: string,
    type?: 'text' | 'email' | 'password' | 'file',
    value: string,
    required?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<inputProps> = ({ name, label, placeholder, value, type = "text", onChange, required }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className=" flex relative m-5 w-full">
            <label htmlFor={name} className="text-gray-600 absolute -top-3 left-2 bg-white ">{label}</label>
            <input
                type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                name={name}
                id={name}
                className="border border-gray-300 p-3  w-full rounded-md focus:outline-none focus:border-blue-500"
                placeholder={placeholder || "Enter " + label}
                value={value}
                onChange={onChange}
                required={required}
            />
            {
                type === 'password' ?
                    <div className='absolute right-3 top-3' onClick={() => setShowPassword(!showPassword)}><img src={eyeOff} /></div> : ""
            }
        </div >
    )
}

export default CustomInput