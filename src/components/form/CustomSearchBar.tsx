import React from 'react'
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomSearch from './CustomSearch';

interface searchProps {
    icon: string;
    title: string;
    onSearch: (event: React.FormEvent) => void;
    path: string;
    value: string
}
const CustomSearchBar: React.FC<searchProps> = ({ title, icon, path, onSearch, value }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-wrap xl:flex-nowrap gap-10 p-5 align-middle  justify-between '>
            <div className='flex flex-wrap w-full xl:w-3/4 align-middle gap-10'>
                <img src={icon} className='h-10 w-auto ' />
                <h1 className='font-bold text-xl'>{title}</h1>
                <CustomSearch label="" onChange={onSearch} name='search' placeholder='Enter name ' value={value} />
            </div>
            <button onClick={() => navigate(path)} className='w-full xl:w-1/5 justify-end  bg-primaryColor text-white'>Add New</button >

        </div>)
}

export default CustomSearchBar