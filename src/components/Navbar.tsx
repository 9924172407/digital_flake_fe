import React, { useState } from 'react';
import logoImage from '../assets/logoLight.png';
import profileIcon from '../assets/profileIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { clearStorage } from '../utils/helper';
import CustomDialog from './CustomDialog';

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
        clearStorage();
        navigate('/login');
    };

    return (
        <>
            <div className="flex justify-between w-full bg-primaryColor text-textPrimary p-5">
                <Link to={'/'}>
                    <img src={logoImage} className="h-8 w-auto" alt="Logo" />
                </Link>

                <div className="relative">
                    <img
                        src={profileIcon}
                        className="h-8 w-auto cursor-pointer"
                        alt="Profile"
                        onClick={handleUserIconClick}
                    />
                    {showLogout && (
                        <div className="absolute right-0 mt-2 bg-white border-gray-300 rounded-md border border-1">
                            <h1
                                className="py-3 px-4 text-red-500 cursor-pointer"
                                onClick={() => setShowDialog(true)}
                            >
                                Logout
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            <CustomDialog
                isOpen={showDialog}
                title="Log Out"
                onClose={() => setShowDialog(false)}
                description="Are you sure you want to log out?"
                onCancel={() => setShowDialog(false)}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default Navbar;
