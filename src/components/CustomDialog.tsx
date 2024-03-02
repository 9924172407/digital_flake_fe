import React from 'react';
import { PrimaryButton, SecondaryButton } from './form/CustomButton';
import alertIcon from "../assets/alert.png"
interface CustomDialogProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;

}

const CustomDialog: React.FC<CustomDialogProps> = ({ title, isOpen, onClose, description,onCancel,onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={onClose}
                    ></div>
                    <div className=" w-2/5  m-auto relative z-50 bg-white p-6 rounded-md shadow-md">
                        <div className="flex flex-row justify-center items-center mb-1">
                            <img src={alertIcon} className='h-15 w-auto' /><h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                        <div className='text-center  text-2xl font-semibold py-5 mb-10'>{description}</div>
                        <div className='flex gap-5 align-middle justify-center'>
                            <SecondaryButton label='Cancel' onClick={onCancel} />
                            <PrimaryButton label='Confirm' onClick={onConfirm} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomDialog;
