import React, { ChangeEvent } from 'react';
import searchIcon from '../../assets/searchIcon.png';
interface SearchProps {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearch: React.FC<SearchProps> = ({ name, label, placeholder, value, onChange }) => {
    return (
        <div className="relative w-2/3  border-borderColor">
            <label htmlFor="searchInput" className="text-gray-600 absolute -top-3 left-2 bg-white">
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    name={name}
                    id="searchInput"
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500 pl-10"
                    placeholder={placeholder || `Search ${label}`}
                    value={value}
                    onChange={onChange}
                />
                <div className="absolute inset-y-0 left-2 flex items-center text-gray-700">
                    <img src={searchIcon} />
                </div>
            </div>
        </div>
    );
};

export default CustomSearch;
