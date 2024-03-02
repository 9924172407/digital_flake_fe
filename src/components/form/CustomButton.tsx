import React, { MouseEventHandler } from 'react'
interface buttonProps {
    label: string,
    type?: 'button' | 'submit',
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton: React.FC<buttonProps> = ({ label, onClick, type = "button" }) => {
    return (
        <button
            className='m-5 w-full  bg-secondaryColor text-white  focus:outline-none'
            type={type}
            onClick={onClick}
        >{label}</button>
    )
}

export default CustomButton

export const PrimaryButton: React.FC<buttonProps> = ({ label, onClick, type = "button" }) => {
    return (
        <button
            className='rounded-3xl bg-secondaryColor text-white px-12'
            type={type}
            onClick={onClick}
        >{label}</button>
    )
}


export const SecondaryButton: React.FC<buttonProps> = ({ label, onClick, type = "button" }) => {
    return (
        <button
            type={type}
            className='rounded-3xl border-secondaryColor text-secondaryColor mr-5 px-12'
            onClick={onClick}
        >{label}</button>
    )
}
